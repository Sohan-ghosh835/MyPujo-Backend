import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { catalogueCorrections, coordinateCandidates, coordinateQueryCache, coordinateResolutionRuns, InsertUser, pandalImageCandidates, pandalImageDiscoveryStates, savedRoutes, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import { nanoid } from "nanoid";
import { hasStrongCoordinateEvidence } from "../shared/coordinateEligibility";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createSavedRoute(input: {
  userId: number;
  title: string;
  plannerInput: Record<string, unknown>;
  routeResult: Record<string, unknown>;
  seasonId?: number;
  isPublic?: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const shareToken = nanoid(16);
  await db.insert(savedRoutes).values({
    shareToken,
    userId: input.userId,
    seasonId: input.seasonId ?? 2026,
    title: input.title,
    plannerInput: input.plannerInput,
    routeResult: input.routeResult,
    isPublic: input.isPublic ?? true,
  });
  return { shareToken };
}

export async function getPublicSavedRoute(shareToken: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.select().from(savedRoutes).where(eq(savedRoutes.shareToken, shareToken)).limit(1);
  const route = result[0];
  if (!route || !route.isPublic) return undefined;
  return route;
}

export async function createCatalogueCorrectionReport(input: {
  recordId?: string;
  issueType: "name" | "address" | "location" | "image" | "source" | "season2026" | "other";
  details: string;
  pageUrl?: string;
  reporterContact?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(catalogueCorrections).values({
    recordId: input.recordId || null,
    issueType: input.issueType,
    details: input.details,
    pageUrl: input.pageUrl || null,
    reporterContact: input.reporterContact || null,
  });
  return { id: Number(result[0].insertId), status: "pending" as const };
}

export type CoordinateCandidateInput = {
  recordId: string;
  latitudeE6: number;
  longitudeE6: number;
  source: string;
  sourceUrl: string;
  query: string;
  displayName: string;
  osmType?: string | null;
  osmId?: string | null;
  confidence: "high" | "medium" | "low" | "unverified";
  status?: "candidate" | "resolved" | "approved" | "rejected" | "unresolved" | "review_required";
  verificationMethod?: string;
  normalizedQuery?: string | null;
  queryHash?: string | null;
  matchedAddress?: string | null;
  evidenceScore?: number | null;
  resolutionRunId?: string | null;
};

export async function getCoordinateCandidate(recordId: string) {
  if (process.env.VITEST) return undefined;
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(coordinateCandidates).where(eq(coordinateCandidates.recordId, recordId)).limit(1);
  return result[0];
}

export async function upsertCoordinateCandidate(input: CoordinateCandidateInput) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const current = await getCoordinateCandidate(input.recordId);
  if (current?.status === "approved" && !current.verificationMethod.startsWith("automatic-")) return current;
  const nextStatus = input.status ?? "candidate";
  const verificationMethod = input.verificationMethod ?? (nextStatus === "resolved" ? "address-resolved" : "nominatim-candidate");
  await db.insert(coordinateCandidates).values({ ...input, status: nextStatus, verificationMethod, osmType: input.osmType ?? null, osmId: input.osmId ?? null }).onDuplicateKeyUpdate({
    set: {
      latitudeE6: input.latitudeE6,
      longitudeE6: input.longitudeE6,
      source: input.source,
      sourceUrl: input.sourceUrl,
      query: input.query,
      displayName: input.displayName,
      osmType: input.osmType ?? null,
      osmId: input.osmId ?? null,
      confidence: input.confidence,
      status: nextStatus,
      verificationMethod,
      reviewerId: null,
      reviewNote: null,
      reviewedAt: null,
      retrievedAt: new Date(),
      normalizedQuery: input.normalizedQuery ?? null,
      queryHash: input.queryHash ?? null,
      matchedAddress: input.matchedAddress ?? null,
      evidenceScore: input.evidenceScore ?? null,
      resolutionRunId: input.resolutionRunId ?? null,
    },
  });
  return getCoordinateCandidate(input.recordId);
}

export async function getCoordinateQueryCache(queryHash: string) {
  const db = await getDb();
  if (!db) return undefined;
  return (await db.select().from(coordinateQueryCache).where(eq(coordinateQueryCache.queryHash, queryHash)).limit(1))[0];
}

export async function upsertCoordinateQueryCache(input: { queryHash: string; normalizedQuery: string; source: string; sourceUrl: string; displayName: string; matchedAddress?: string | null; latitudeE6: number; longitudeE6: number; osmType?: string | null; osmId?: string | null }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(coordinateQueryCache).values({ ...input, matchedAddress: input.matchedAddress ?? null, osmType: input.osmType ?? null, osmId: input.osmId ?? null }).onDuplicateKeyUpdate({ set: { source: input.source, sourceUrl: input.sourceUrl, displayName: input.displayName, matchedAddress: input.matchedAddress ?? null, latitudeE6: input.latitudeE6, longitudeE6: input.longitudeE6, osmType: input.osmType ?? null, osmId: input.osmId ?? null, retrievedAt: new Date() } });
  return getCoordinateQueryCache(input.queryHash);
}

export async function createCoordinateResolutionRun(input: { id: string; totalRecords: number; sourcePolicy: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(coordinateResolutionRuns).values({ ...input, state: "running", startedAt: new Date() });
}

export async function updateCoordinateResolutionRun(input: { id: string; state?: "queued" | "running" | "completed" | "failed"; processedRecords: number; verifiedCount: number; resolvedCount: number; reviewRequiredCount: number; unresolvedCount: number; rejectedCount: number; errorMessage?: string | null }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(coordinateResolutionRuns).set({ ...input, completedAt: input.state === "completed" || input.state === "failed" ? new Date() : undefined }).where(eq(coordinateResolutionRuns.id, input.id));
}

export async function getLatestCoordinateResolutionRun() {
  const db = await getDb();
  if (!db) return undefined;
  return (await db.select().from(coordinateResolutionRuns).orderBy(desc(coordinateResolutionRuns.createdAt)).limit(1))[0];
}

export async function reviewCoordinateCandidate(input: { recordId: string; status: "approved" | "resolved" | "rejected" | "unresolved" | "review_required"; reviewNote: string; reviewerId: number | null; latitudeE6?: number; longitudeE6?: number; verificationMethod?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const candidate = (await db.select().from(coordinateCandidates).where(eq(coordinateCandidates.recordId, input.recordId)).limit(1))[0];
  if (!candidate) throw new Error("Coordinate candidate not found");
  if ((input.status === "approved" || input.status === "resolved") && !hasStrongCoordinateEvidence(candidate)) {
    throw new Error("Verification or resolution requires retained high-confidence evidence (score 90 or above); use review required or rejected for weaker matches");
  }
  await db.update(coordinateCandidates).set({
    status: input.status,
    reviewNote: input.reviewNote,
    reviewerId: input.reviewerId,
    verificationMethod: input.verificationMethod ?? (input.status === "approved" ? "admin-approved" : input.status === "resolved" ? "admin-resolved" : "admin-reviewed"),
    reviewedAt: new Date(),
    ...(input.latitudeE6 !== undefined ? { latitudeE6: input.latitudeE6 } : {}),
    ...(input.longitudeE6 !== undefined ? { longitudeE6: input.longitudeE6 } : {}),
  }).where(eq(coordinateCandidates.recordId, input.recordId));
  return getCoordinateCandidate(input.recordId);
}

export async function listCoordinateCandidates(status?: "candidate" | "resolved" | "approved" | "rejected" | "unresolved" | "review_required") {
  if (process.env.VITEST) return [];
  const db = await getDb();
  if (!db) return [];
  return status ? db.select().from(coordinateCandidates).where(eq(coordinateCandidates.status, status)) : db.select().from(coordinateCandidates);
}

export type PandalImageCandidateInput = {
  candidateId: string;
  recordId: string;
  imageUrl: string;
  sourcePage: string;
  source: string;
  originalFilename: string;
  inferredName: string;
  matchMethod: string;
  matchConfidence: number;
  license?: string | null;
  attribution?: string | null;
  sourceDomain?: string | null;
  sourceTier?: "official" | "open_repository" | "discovery_reference" | "search_discovery" | "other";
  discoveredFrom?: string;
  importBatchId?: string;
  licenseUrl?: string | null;
  capturedYear?: number | null;
  yearConfidence?: "verified" | "source_stated" | "inferred" | "unknown";
};

export async function upsertPandalImageCandidate(input: PandalImageCandidateInput) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(pandalImageCandidates).values({ ...input, license: input.license ?? null, attribution: input.attribution ?? null, sourceDomain: input.sourceDomain ?? null, sourceTier: input.sourceTier ?? "open_repository", discoveredFrom: input.discoveredFrom ?? "dataset_import", importBatchId: input.importBatchId ?? "legacy", licenseUrl: input.licenseUrl ?? null, capturedYear: input.capturedYear ?? null, yearConfidence: input.yearConfidence ?? "unknown" }).onDuplicateKeyUpdate({
    set: {
      recordId: input.recordId,
      imageUrl: input.imageUrl,
      sourcePage: input.sourcePage,
      source: input.source,
      originalFilename: input.originalFilename,
      inferredName: input.inferredName,
      matchMethod: input.matchMethod,
      matchConfidence: input.matchConfidence,
      sourceDomain: input.sourceDomain ?? null,
      sourceTier: input.sourceTier ?? "open_repository",
      discoveredFrom: input.discoveredFrom ?? "dataset_import",
      importBatchId: input.importBatchId ?? "legacy",
      licenseUrl: input.licenseUrl ?? null,
      capturedYear: input.capturedYear ?? null,
      yearConfidence: input.yearConfidence ?? "unknown",
      updatedAt: new Date(),
    },
  });
}

export type ImageCandidateStatus = "discovered" | "candidate" | "matched" | "needs_review" | "license_unknown" | "approved" | "published" | "rejected" | "broken" | "removed" | "unmatched" | "review_required" | "unreachable" | "duplicate" | "no_match";

export async function listPandalImageCandidates(status?: ImageCandidateStatus) {
  if (process.env.VITEST) return [];
  const db = await getDb();
  if (!db) return [];
  return status ? db.select().from(pandalImageCandidates).where(eq(pandalImageCandidates.status, status)) : db.select().from(pandalImageCandidates);
}

export async function applyPandalImageCandidateValidation(input: { candidateId: string; status: ImageCandidateStatus; usageStatus: "unknown" | "license_verified" | "approved_for_publication" | "restricted" | "broken" | "removed"; license?: string | null; licenseUrl?: string | null; attribution?: string | null; capturedYear?: number | null; yearConfidence?: "verified" | "source_stated" | "inferred" | "unknown"; sourceDomain?: string | null; contentType?: string | null; width?: number | null; height?: number | null; byteSize?: number | null; technicalQualityScore?: number | null; qualityNote?: string | null; sha256?: string | null; duplicateGroup?: string | null; validationNote: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(pandalImageCandidates).set({ status: input.status, usageStatus: input.usageStatus, license: input.license ?? null, licenseUrl: input.licenseUrl ?? null, attribution: input.attribution ?? null, capturedYear: input.capturedYear ?? null, yearConfidence: input.yearConfidence ?? "unknown", sourceDomain: input.sourceDomain ?? null, contentType: input.contentType ?? null, width: input.width ?? null, height: input.height ?? null, byteSize: input.byteSize ?? null, technicalQualityScore: input.technicalQualityScore ?? null, qualityNote: input.qualityNote ?? null, sha256: input.sha256 ?? null, duplicateGroup: input.duplicateGroup ?? null, validationNote: input.validationNote, lastValidatedAt: new Date(), updatedAt: new Date() }).where(eq(pandalImageCandidates.candidateId, input.candidateId));
}

export async function upsertPandalImageDiscoveryState(input: { recordId: string; status: "not_searched" | "searching" | "candidates_found" | "review_required" | "no_verified_image_found" | "verified"; sourcesChecked: number; searchVariants: string[]; candidateCount: number; noImageReason?: string | null; importBatchId?: string | null }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(pandalImageDiscoveryStates).values({ ...input, noImageReason: input.noImageReason ?? null, importBatchId: input.importBatchId ?? null, lastSearchedAt: new Date() }).onDuplicateKeyUpdate({ set: { status: input.status, sourcesChecked: input.sourcesChecked, searchVariants: input.searchVariants, candidateCount: input.candidateCount, noImageReason: input.noImageReason ?? null, importBatchId: input.importBatchId ?? null, lastSearchedAt: new Date(), updatedAt: new Date() } });
}

export async function listPandalImageDiscoveryStates() {
  if (process.env.VITEST) return [];
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pandalImageDiscoveryStates);
}

export async function reviewPandalImageCandidate(input: { candidateId: string; status: "approved" | "review_required" | "rejected" | "unreachable" | "duplicate" | "no_match" | "removed"; reviewNote: string; reviewerId: number | null; license?: string; attribution?: string; licenseUrl?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const candidate = (await db.select().from(pandalImageCandidates).where(eq(pandalImageCandidates.candidateId, input.candidateId)).limit(1))[0];
  if (!candidate) throw new Error("Image candidate not found");
  const license = input.license?.trim() || candidate.license;
  const attribution = input.attribution?.trim() || candidate.attribution;
  const licenseUrl = input.licenseUrl?.trim() || candidate.licenseUrl;
  const safeApproval = candidate.usageStatus === "license_verified"
    && Boolean(license && attribution && licenseUrl)
    && candidate.matchConfidence >= 90
    && candidate.visualMatchConfidence !== null
    && candidate.visualMatchConfidence >= 90
    && Boolean(candidate.contentType?.startsWith("image/") && candidate.width && candidate.height && (candidate.technicalQualityScore ?? 0) >= 70);
  if (input.status === "approved" && !safeApproval) throw new Error("Approval requires validated image content, identity evidence, an open licence URL, and attribution");
  const nextUsage = input.status === "approved" ? "approved_for_publication" : input.status === "removed" ? "removed" : input.status === "unreachable" ? "broken" : candidate.usageStatus;
  await db.update(pandalImageCandidates).set({ status: input.status, usageStatus: nextUsage, reviewNote: input.reviewNote, reviewerId: input.reviewerId, reviewedAt: new Date(), ...(input.status === "removed" ? { removedAt: new Date() } : {}), ...(input.license?.trim() ? { license: input.license.trim() } : {}), ...(input.attribution?.trim() ? { attribution: input.attribution.trim() } : {}), ...(input.licenseUrl?.trim() ? { licenseUrl: input.licenseUrl.trim() } : {}) }).where(eq(pandalImageCandidates.candidateId, input.candidateId));
}

export async function attachApprovedPandalImageAsset(input: { candidateId: string; managedAssetUrl: string; managedAssetKey: string; visualMatchConfidence: number; sha256: string }) {
  if (!input.managedAssetUrl.startsWith("/manus-storage/") || input.visualMatchConfidence < 90 || !/^[a-f0-9]{64}$/i.test(input.sha256)) throw new Error("Managed asset, high visual-match confidence, and SHA-256 are required");
  const db = await getDb(); if (!db) throw new Error("Database unavailable");
  const candidate = (await db.select().from(pandalImageCandidates).where(eq(pandalImageCandidates.candidateId, input.candidateId)).limit(1))[0];
  if (!candidate || candidate.status !== "approved" || candidate.usageStatus !== "approved_for_publication" || !candidate.license || !candidate.licenseUrl || !candidate.attribution) throw new Error("Candidate is not approval-complete");
  await db.update(pandalImageCandidates).set({ managedAssetUrl: input.managedAssetUrl, managedAssetKey: input.managedAssetKey, visualMatchConfidence: input.visualMatchConfidence, sha256: input.sha256, assetAttachedAt: new Date(), updatedAt: new Date() }).where(eq(pandalImageCandidates.candidateId, input.candidateId));
}
