import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { ALL_PANDALS, SECTIONS, toPandalListItem } from "../shared/pujaData";
import { createCatalogueCorrectionReport, createSavedRoute, getCoordinateCandidate, getLatestCoordinateResolutionRun, getPublicSavedRoute, listCoordinateCandidates, listPandalImageCandidates, listPandalImageDiscoveryStates, reviewCoordinateCandidate, reviewPandalImageCandidate } from "./db";
import { findPandal, listPandals, sectionSummary } from "./services/pandalCatalog";
import { optimizeRoute } from "./services/routeOptimizer";
import { estimateRouteToPandal } from "./services/routeEstimate";
import { resolveCoordinateCandidate, withApprovedCoordinates } from "./services/coordinateResolution";
import { calculateNavigationCoverage } from "../shared/navigationReadiness";
import { calculateImageCandidateCoverage } from "../shared/imageCandidateCoverage";

const sectionSchema = z.enum(["North Kolkata", "South Kolkata", "Central Kolkata", "East Kolkata", "West Kolkata", "Salt Lake", "New Town"]);
const routeInput = z.object({
  startingPoint: z.string().trim().min(2).max(160),
  section: z.union([sectionSchema, z.literal("All Kolkata")]),
  timeBudgetMinutes: z.number().int().min(60).max(720),
  transportMode: z.enum(["Walking", "Metro + Walking", "Public Transport", "Car", "Bike", "Mixed"]),
  preferences: z.array(z.enum(["Most Famous", "Artistic", "Traditional", "Family Friendly", "Less Crowded", "Hidden Gems"])).max(6),
  crowdTolerance: z.enum(["Low", "Balanced", "High"]),
});
const routeResultSchema = z.object({
  stops: z.array(z.object({ order: z.number(), pandal: z.object({ id: z.string(), name: z.string() }).passthrough() }).passthrough()),
}).passthrough();

function groundedAssistantAnswer(question: string) {
  const query = question.toLowerCase();
  const section = query.includes("south") ? "South Kolkata" : query.includes("north") ? "North Kolkata" : query.includes("central") ? "Central Kolkata" : "All Kolkata";
  const timeMatch = query.match(/(\d+)\s*(?:hours?|hrs?)/);
  const timeBudgetMinutes = timeMatch ? Math.min(Number(timeMatch[1]) * 60, 720) : 240;
  const preferences = [
    ...(query.includes("famous") ? ["Most Famous" as const] : []),
    ...(query.includes("artistic") || query.includes("theme") ? ["Artistic" as const] : []),
    ...(query.includes("traditional") ? ["Traditional" as const] : []),
    ...(query.includes("family") || query.includes("parents") ? ["Family Friendly" as const] : []),
    ...(query.includes("less crowded") || query.includes("low crowd") ? ["Less Crowded" as const] : []),
  ];
  const matches = listPandals({ section }).filter(record => {
    if (preferences.includes("Artistic") && record.visitorContext?.lens === "Artistry") return true;
    if (preferences.includes("Traditional") && record.visitorContext?.lens === "Heritage") return true;
    return preferences.length === 0 || preferences.includes("Most Famous");
  }).slice(0, Math.max(2, Math.min(6, Math.round(timeBudgetMinutes / 60))));
  const suggestedNames = matches.map(record => record.name).join(" → ") || "no matching sourced records";
  return {
    answer: `For a ${section} PujoParikroma focused on ${preferences.length ? preferences.join(" and ") : "your ranked list"}, begin with: ${suggestedNames}. These are catalogue suggestions ordered from supplied rank and source-linked guide context. Use the Parikrama page to save or copy the list; it does not claim a live travel route, duration, queue, or entry status.`,
    route: null,
    dataStatus: "catalogue" as const,
  };
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  pandals: router({
    list: publicProcedure.input(z.object({ query: z.string().optional(), section: z.union([sectionSchema, z.literal("All Kolkata")]).optional(), crowd: z.string().optional(), tag: z.string().optional(), verifiedOnly: z.boolean().optional(), priority: z.enum(["S", "A", "B", "C"]).optional(), hasImage: z.boolean().optional(), locationStatus: z.enum(["verified-coordinate", "address-available", "approximate-locality"]).optional(), source: z.literal("kolkatakhoj").optional(), sourceZone: z.enum(["North", "Central", "South", "Salt Lake"]).optional(), sourceFeatured: z.boolean().optional() }).optional()).query(async ({ input }) => ({ data: (await withApprovedCoordinates(listPandals(input))).map(toPandalListItem), dataStatus: "development" as const })),
    mapList: publicProcedure.query(async () => ({ data: await withApprovedCoordinates(listPandals()), dataStatus: "development" as const })),
    detail: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
      const pandal = findPandal(input.id);
      if (!pandal) return { data: null, error: "PANDAL_NOT_FOUND", dataStatus: "development" as const };
      return { data: (await withApprovedCoordinates([pandal]))[0], error: null, dataStatus: "development" as const };
    }),
    sections: publicProcedure.query(() => ({ data: SECTIONS.map(sectionSummary), dataStatus: "development" as const })),
  }),
  coordinates: router({
    get: publicProcedure.input(z.object({ recordId: z.string().trim().min(1).max(220) })).query(async ({ input }) => (await getCoordinateCandidate(input.recordId)) ?? null),
    resolve: adminProcedure.input(z.object({ recordId: z.string().trim().min(1).max(220) })).mutation(({ input }) => resolveCoordinateCandidate(input.recordId)),
    adminList: adminProcedure.input(z.object({ status: z.enum(["candidate", "resolved", "approved", "rejected", "unresolved", "review_required"]).optional() }).optional()).query(({ input }) => listCoordinateCandidates(input?.status)),
    resolveForNavigation: publicProcedure.input(z.object({ recordId: z.string().trim().min(1).max(220) })).mutation(({ input }) => resolveCoordinateCandidate(input.recordId)),
    coverage: adminProcedure.query(async () => {
      try {
        return { ...calculateNavigationCoverage(ALL_PANDALS, await listCoordinateCandidates()), latestRun: await getLatestCoordinateResolutionRun(), reviewQueueAvailable: true };
      } catch {
        return { ...calculateNavigationCoverage(ALL_PANDALS, []), latestRun: null, reviewQueueAvailable: false };
      }
    }),
    review: adminProcedure.input(z.object({ recordId: z.string().trim().min(1).max(220), status: z.enum(["approved", "resolved", "rejected", "unresolved", "review_required"]), reviewNote: z.string().trim().min(3).max(1400), latitudeE6: z.number().int().min(-90_000_000).max(90_000_000).optional(), longitudeE6: z.number().int().min(-180_000_000).max(180_000_000).optional() })).mutation(({ input, ctx }) => reviewCoordinateCandidate({ ...input, reviewerId: ctx.user.id })),
  }),
  imageCandidates: router({
    adminList: adminProcedure.input(z.object({ status: z.enum(["discovered", "candidate", "matched", "needs_review", "license_unknown", "approved", "published", "rejected", "broken", "removed", "unmatched", "review_required", "unreachable", "duplicate", "no_match"]).optional() }).optional()).query(({ input }) => listPandalImageCandidates(input?.status)),
    coverage: adminProcedure.query(async () => calculateImageCandidateCoverage(ALL_PANDALS, await listPandalImageCandidates(), await listPandalImageDiscoveryStates())),
    review: adminProcedure.input(z.object({ candidateId: z.string().trim().min(12).max(96), status: z.enum(["approved", "review_required", "rejected", "unreachable", "duplicate", "no_match", "removed"]), reviewNote: z.string().trim().min(3).max(1400), license: z.string().trim().max(160).optional(), licenseUrl: z.string().url().max(1000).optional(), attribution: z.string().trim().max(2000).optional() })).mutation(({ input, ctx }) => reviewPandalImageCandidate({ ...input, reviewerId: ctx.user.id })),
  }),
  routes: router({
    optimize: publicProcedure.input(routeInput).mutation(({ input }) => optimizeRoute(input)),
    estimate: publicProcedure.input(z.object({ recordId: z.string().trim().min(1).max(220), originLat: z.number().finite().min(-90).max(90), originLng: z.number().finite().min(-180).max(180), mode: z.enum(["walking", "driving"]), allowCandidate: z.boolean().optional() })).mutation(({ input }) => estimateRouteToPandal(input)),
    save: protectedProcedure.input(z.object({ title: z.string().trim().min(3).max(180), plannerInput: routeInput, routeResult: routeResultSchema })).mutation(async ({ input, ctx }) => {
      return createSavedRoute({ userId: ctx.user.id, title: input.title, plannerInput: input.plannerInput, routeResult: input.routeResult });
    }),
    getShared: publicProcedure.input(z.object({ shareToken: z.string().min(8).max(64) })).query(async ({ input }) => {
      const route = await getPublicSavedRoute(input.shareToken);
      if (!route) return { data: null, error: "ROUTE_NOT_FOUND" as const };
      return { data: route, error: null };
    }),
  }),
  assistant: router({
    ask: publicProcedure.input(z.object({ question: z.string().trim().min(4).max(400) })).mutation(({ input }) => groundedAssistantAnswer(input.question)),
  }),
  corrections: router({
    submit: publicProcedure.input(z.object({ recordId: z.string().trim().max(220).optional(), issueType: z.enum(["name", "address", "location", "image", "source", "season2026", "other"]), details: z.string().trim().min(12).max(1400), pageUrl: z.string().url().max(512).refine(url => /^https?:\/\//i.test(url), "Only HTTP(S) page URLs are accepted").optional(), reporterContact: z.string().trim().max(320).optional() })).mutation(async ({ input }) => ({ data: await createCatalogueCorrectionReport(input) })),
  }),
});

export type AppRouter = typeof appRouter;
