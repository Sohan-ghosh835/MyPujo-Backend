import type { PandalRecord } from "./pujaData";

type Candidate = { recordId: string; status: string; source: string; capturedYear: number | null; usageStatus: string; sourceDomain: string | null; technicalQualityScore: number | null; managedAssetUrl?: string | null };
type DiscoveryState = { recordId: string; status: string; sourcesChecked: number; candidateCount: number; noImageReason: string | null };

export function calculateImageCandidateCoverage(records: PandalRecord[], candidates: Candidate[], discoveryStates: DiscoveryState[]) {
  const publicImageRecordIds = new Set(records.filter(record => Boolean(record.image || record.images?.length)).map(record => record.id));
  const stateByRecord = new Map(discoveryStates.map(state => [state.recordId, state]));
  const candidatesByRecord = new Map<string, Candidate[]>();
  for (const candidate of candidates) candidatesByRecord.set(candidate.recordId, [...(candidatesByRecord.get(candidate.recordId) ?? []), candidate]);
  const lifecycle = {
    discovered: candidates.filter(candidate => candidate.status === "discovered" || candidate.status === "candidate" || candidate.status === "matched").length,
    needsReview: candidates.filter(candidate => candidate.status === "review_required" || candidate.status === "needs_review" || candidate.status === "license_unknown").length,
    approved: candidates.filter(candidate => candidate.status === "approved").length,
    managedApproved: candidates.filter(candidate => candidate.status === "approved" && Boolean(candidate.managedAssetUrl)).length,
    published: candidates.filter(candidate => candidate.status === "published").length,
    rejected: candidates.filter(candidate => candidate.status === "rejected").length,
    broken: candidates.filter(candidate => candidate.status === "broken" || candidate.status === "unreachable").length,
    removed: candidates.filter(candidate => candidate.status === "removed").length,
    unverifiedLicence: candidates.filter(candidate => candidate.usageStatus === "unknown").length,
  };
  const priority = ["S", "A", "B", "C", "Unranked"].map(priorityKey => {
    const group = records.filter(record => (record.suppliedPriority ?? "Unranked") === priorityKey);
    return { priority: priorityKey, records: group.length, publicImageRecords: group.filter(record => publicImageRecordIds.has(record.id)).length, candidateRecords: group.filter(record => candidatesByRecord.has(record.id)).length };
  });
  const areas = Array.from(new Set(records.map(record => record.section))).map(area => {
    const group = records.filter(record => record.section === area);
    return { area, records: group.length, publicImageRecords: group.filter(record => publicImageRecordIds.has(record.id)).length, candidateRecords: group.filter(record => candidatesByRecord.has(record.id)).length };
  }).sort((a, b) => a.area.localeCompare(b.area));
  const noImageQueue = records.filter(record => !publicImageRecordIds.has(record.id)).map(record => {
    const state = stateByRecord.get(record.id); const recordCandidates = candidatesByRecord.get(record.id) ?? [];
    return { recordId: record.id, name: record.name, priority: record.suppliedPriority ?? null, area: record.section, imageStatus: state?.status ?? (recordCandidates.length ? "review_required" : "not_searched"), sourcesChecked: state?.sourcesChecked ?? 0, candidateCount: recordCandidates.length, noImageReason: state?.noImageReason ?? null };
  });
  return { totalRecords: records.length, publicImageRecords: publicImageRecordIds.size, publicImageCoveragePercent: Math.round((publicImageRecordIds.size / Math.max(1, records.length)) * 1000) / 10, lifecycle, priority, areas, noImageQueue, sourceCounts: Object.entries(candidates.reduce<Record<string, number>>((acc, candidate) => { acc[candidate.source] = (acc[candidate.source] ?? 0) + 1; return acc; }, {})).map(([source, count]) => ({ source, count })) };
}
