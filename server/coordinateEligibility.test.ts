import { describe, expect, it } from "vitest";
import { coordinateIsNavigationEligible, hasStrongCoordinateEvidence } from "../shared/coordinateEligibility";

describe("coordinate evidence eligibility", () => {
  it("does not treat a three-character manual note or low/medium evidence score as navigation proof", () => {
    expect(hasStrongCoordinateEvidence({ status: "approved", confidence: "medium", evidenceScore: 75 })).toBe(false);
    expect(coordinateIsNavigationEligible({ status: "approved", confidence: "low", evidenceScore: 50 })).toBe(false);
  });

  it("permits only an approved or resolved high-confidence candidate with strong retained evidence", () => {
    expect(coordinateIsNavigationEligible({ status: "approved", confidence: "high", evidenceScore: 90 })).toBe(true);
    expect(coordinateIsNavigationEligible({ status: "review_required", confidence: "high", evidenceScore: 100 })).toBe(false);
  });
});
