export type CoordinateEvidenceCandidate = {
  status: "candidate" | "resolved" | "approved" | "rejected" | "unresolved" | "review_required";
  confidence?: "high" | "medium" | "low" | "unverified";
  evidenceScore?: number | null;
};

export function hasStrongCoordinateEvidence(candidate: CoordinateEvidenceCandidate | undefined) {
  return Boolean(candidate && candidate.confidence === "high" && (candidate.evidenceScore ?? 0) >= 90);
}

export function coordinateIsNavigationEligible(candidate: CoordinateEvidenceCandidate | undefined) {
  return Boolean(candidate && (candidate.status === "approved" || candidate.status === "resolved") && hasStrongCoordinateEvidence(candidate));
}
