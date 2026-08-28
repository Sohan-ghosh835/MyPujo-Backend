import { describe, expect, it } from "vitest";
import { calculateImageCandidateCoverage } from "../shared/imageCandidateCoverage";
import { ALL_PANDALS } from "../shared/pujaData";

describe("image candidate coverage", () => {
  it("keeps review-only candidate evidence separate from public image coverage", () => {
    const noImageRecord = ALL_PANDALS.find(record => !record.image && !record.images?.length);
    expect(noImageRecord).toBeDefined();
    const candidate = { recordId: noImageRecord!.id, status: "needs_review", source: "wikimedia_commons", capturedYear: 2010, usageStatus: "license_verified", sourceDomain: "commons.wikimedia.org", technicalQualityScore: 85 };
    const result = calculateImageCandidateCoverage(ALL_PANDALS, [candidate], [{ recordId: candidate.recordId, status: "review_required", sourcesChecked: 1, candidateCount: 1, noImageReason: null }]);
    expect(result.totalRecords).toBe(544);
    expect(result.lifecycle.needsReview).toBe(1);
    expect(result.lifecycle.approved).toBe(0);
    expect(result.sourceCounts).toEqual([{ source: "wikimedia_commons", count: 1 }]);
    expect(result.noImageQueue.some(row => row.recordId === candidate.recordId && row.imageStatus === "review_required")).toBe(true);
  });

  it("counts automatically approved candidates with a managed asset separately from review evidence", () => {
    const record = ALL_PANDALS[0];
    const candidate = { recordId: record.id, status: "approved", source: "wikimedia_commons", capturedYear: 2010, usageStatus: "approved_for_publication", sourceDomain: "commons.wikimedia.org", technicalQualityScore: 85, managedAssetUrl: "/manus-storage/verified-pandal.jpg" };
    const result = calculateImageCandidateCoverage(ALL_PANDALS, [candidate], []);
    expect(result.lifecycle).toMatchObject({ approved: 1, managedApproved: 1 });
  });
});
