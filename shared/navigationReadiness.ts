import type { PandalRecord } from "./pujaData";
import { coordinateIsNavigationEligible } from "./coordinateEligibility";

export type NavigationReadiness = "ready" | "needs_review" | "unverified";
type CandidateLike = { recordId: string; status: "candidate" | "resolved" | "approved" | "rejected" | "unresolved" | "review_required"; confidence?: "high" | "medium" | "low" | "unverified"; evidenceScore?: number | null };
type Priority = "S" | "A" | "B" | "C";
export type NavigationCoverage = {
  totalPandals: number;
  navigationReady: number;
  needsReview: number;
  unverified: number;
  canonicalVerified: number;
  approvedReviews: number;
  verifiedCoordinates: number;
  resolvedCoordinates: number;
  rejectedCoordinates: number;
  unresolvedCoordinates: number;
  pendingReview: number;
  mediumConfidence: number;
  lowConfidence: number;
  byPriority: Record<Priority, { total: number; ready: number; needsReview: number; unverified: number }>;
};

const priorities: Priority[] = ["S", "A", "B", "C"];

export function navigationReadinessFor(record: Pick<PandalRecord, "latitude" | "longitude" | "coordinateConfidence">, candidate?: CandidateLike): NavigationReadiness {
  if ((record.latitude !== 0 || record.longitude !== 0) && record.coordinateConfidence === "high") return "ready";
  if (coordinateIsNavigationEligible(candidate)) return "ready";
  if (candidate?.status === "candidate" || candidate?.status === "review_required" || candidate?.status === "approved" || candidate?.status === "resolved") return "needs_review";
  if ((record.latitude !== 0 || record.longitude !== 0) && record.coordinateConfidence && record.coordinateConfidence !== "high") return "needs_review";
  return "unverified";
}

export function calculateNavigationCoverage(records: PandalRecord[], candidates: CandidateLike[]): NavigationCoverage {
  const candidateById = new Map(candidates.map(candidate => [candidate.recordId, candidate]));
  const byPriority = Object.fromEntries(priorities.map(priority => [priority, { total: 0, ready: 0, needsReview: 0, unverified: 0 }])) as NavigationCoverage["byPriority"];
  let navigationReady = 0; let needsReview = 0; let unverified = 0; let canonicalVerified = 0; let approvedReviews = 0; let resolvedCoordinates = 0; let rejectedCoordinates = 0;
  for (const record of records) {
    const readiness = navigationReadinessFor(record, candidateById.get(record.id));
    if (readiness === "ready") navigationReady += 1;
    if (readiness === "needs_review") needsReview += 1;
    if (readiness === "unverified") unverified += 1;
    if (record.latitude !== 0 && record.longitude !== 0 && record.coordinateConfidence === "high") canonicalVerified += 1;
    if (coordinateIsNavigationEligible(candidateById.get(record.id)) && candidateById.get(record.id)?.status === "approved" && !(record.latitude !== 0 && record.longitude !== 0 && record.coordinateConfidence === "high")) approvedReviews += 1;
    if (coordinateIsNavigationEligible(candidateById.get(record.id)) && candidateById.get(record.id)?.status === "resolved") resolvedCoordinates += 1;
    if (candidateById.get(record.id)?.status === "rejected") rejectedCoordinates += 1;
    const priority = record.suppliedPriority ?? record.priority;
    if (priority && priorities.includes(priority)) { byPriority[priority].total += 1; if (readiness === "needs_review") byPriority[priority].needsReview += 1; else byPriority[priority][readiness] += 1; }
  }
  const pending = candidates.filter(candidate => candidate.status === "candidate" || candidate.status === "review_required");
  const verifiedCoordinates = canonicalVerified + approvedReviews;
  const unresolvedCoordinates = Math.max(0, records.length - verifiedCoordinates - resolvedCoordinates - needsReview - rejectedCoordinates);
  return { totalPandals: records.length, navigationReady, needsReview, unverified, canonicalVerified, approvedReviews, verifiedCoordinates, resolvedCoordinates, rejectedCoordinates, unresolvedCoordinates, pendingReview: pending.length, mediumConfidence: pending.filter(candidate => candidate.confidence === "medium").length, lowConfidence: pending.filter(candidate => candidate.confidence === "low").length, byPriority };
}
