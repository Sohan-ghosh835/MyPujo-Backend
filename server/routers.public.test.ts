import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const publicContext = {
  user: null,
  req: { protocol: "https", headers: {} },
  res: { clearCookie: () => undefined },
} as unknown as TrpcContext;

const adminContext = {
  user: { id: 1, openId: "admin-test", name: "Admin", email: null, loginMethod: "manus", role: "admin", createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
  req: { protocol: "https", headers: {} },
  res: { clearCookie: () => undefined },
} as unknown as TrpcContext;

describe("public PujoParikroma procedures", () => {
  it("returns sourced committee identities in a compact Explore-safe response", async () => {
    const caller = appRouter.createCaller(publicContext);
    const result = await caller.pandals.list({ section: "South Kolkata" });
    expect(result.dataStatus).toBe("development");
    expect(result.data.every(pandal => pandal.sources.length > 0)).toBe(true);
    expect(result.data.every(pandal => !("latitude" in pandal) && !("openingHours" in pandal))).toBe(true);
  });

  it("keeps full coordinates and record data on the separate map endpoint", async () => {
    const caller = appRouter.createCaller(publicContext);
    const result = await caller.pandals.mapList();
    expect(result.dataStatus).toBe("development");
    expect(result.data.some(pandal => pandal.latitude !== 0 && pandal.longitude !== 0)).toBe(true);
    expect(result.data.every(pandal => pandal.sources.length > 0)).toBe(true);
  });

  it("returns explicit null for a record without a review candidate and keeps coordinate enrichment protected", async () => {
    const caller = appRouter.createCaller(publicContext);
    await expect(caller.coordinates.get({ recordId: "pack-college-square-durga-puja" })).resolves.toBeNull();
    await expect(caller.coordinates.coverage()).rejects.toBeDefined();
    await expect(caller.coordinates.resolve({ recordId: "address-bagbazar-sarbojanin-700003" })).rejects.toBeDefined();
    await expect(caller.imageCandidates.adminList({ status: "needs_review" })).rejects.toBeDefined();
    await expect(caller.imageCandidates.coverage()).rejects.toBeDefined();
  });

  it("keeps assistant answers grounded in available catalogue records without fabricating a route", async () => {
    const caller = appRouter.createCaller(publicContext);
    const result = await caller.assistant.ask({ question: "Give me famous South Kolkata pandals in 4 hours" });
    expect(result.dataStatus).toBe("catalogue");
    expect(result.answer).toContain("does not claim a live travel route");
    expect(result.route).toBeNull();
  });

  it("rejects malformed public correction reports before attempting database storage", async () => {
    const caller = appRouter.createCaller(publicContext);
    await expect(caller.corrections.submit({ issueType: "address", details: "too short" })).rejects.toBeDefined();
    await expect(caller.corrections.submit({ issueType: "source", details: "The cited source URL needs a correction.", pageUrl: "javascript:alert(1)" })).rejects.toBeDefined();
  });

  it("keeps persistent routes protected and bounds public assistant input", async () => {
    const caller = appRouter.createCaller(publicContext);
    await expect(caller.routes.save({ title: "A valid saved route", plannerInput: { startingPoint: "Gariahat", section: "South Kolkata", timeBudgetMinutes: 180, transportMode: "Metro + Walking", preferences: ["Most Famous"], crowdTolerance: "Balanced" }, routeResult: { stops: [] } })).rejects.toBeDefined();
    await expect(caller.routes.getShared({ shareToken: "a".repeat(65) })).rejects.toBeDefined();
    await expect(caller.assistant.ask({ question: "a".repeat(401) })).rejects.toBeDefined();
  });

  it("rejects a protected image review before persistence when its trimmed note is shorter than three characters", async () => {
    const caller = appRouter.createCaller(adminContext);
    await expect(caller.imageCandidates.review({ candidateId: "starter-wikimedia-d88563ed1ec72cb182c6", status: "review_required", reviewNote: "ok" })).rejects.toBeDefined();
  });
});
