import { describe, expect, it } from "vitest";
import { imageReviewPresentation } from "../shared/imageReviewPresentation";

describe("automatic image review presentation", () => {
  it("shows a completed automatic outcome only for an attached high-confidence approval", () => {
    expect(imageReviewPresentation({ status: "approved", managedAssetUrl: "/manus-storage/pandal.jpg", visualMatchConfidence: 93 }).title).toBe("Automatically approved and attached");
  });

  it("keeps ambiguous candidates visibly outside public use rather than inviting a manual metadata override", () => {
    const result = imageReviewPresentation({ status: "review_required", managedAssetUrl: null, visualMatchConfidence: null });
    expect(result.tone).toBe("review");
    expect(result.detail).toContain("excluded from the public catalogue");
  });
});
