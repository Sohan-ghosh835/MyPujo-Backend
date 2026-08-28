import { describe, expect, it } from "vitest";
import { calculateNavigationCoverage, navigationReadinessFor } from "../shared/navigationReadiness";

const base = { latitude: 0, longitude: 0, coordinateConfidence: undefined } as const;

describe("navigation readiness", () => {
  it("keeps candidate and unverified locations out of precision navigation", () => {
    expect(navigationReadinessFor({ ...base, latitude: 22.57, longitude: 88.36, coordinateConfidence: "high" })).toBe("ready");
    expect(navigationReadinessFor(base, { recordId: "a", status: "candidate" })).toBe("needs_review");
    expect(navigationReadinessFor(base, { recordId: "a", status: "unresolved" })).toBe("unverified");
  });

  it("accounts for every record and each supplied priority without hardcoded totals", () => {
    const records = [
      { ...base, id: "one", priority: "S", suppliedPriority: "S" },
      { ...base, id: "two", priority: "A", suppliedPriority: "A", latitude: 22.5, longitude: 88.3, coordinateConfidence: "high" },
      { ...base, id: "three", priority: "B", suppliedPriority: "B" },
    ] as never[];
    const coverage = calculateNavigationCoverage(records, [{ recordId: "one", status: "candidate", confidence: "low" }]);
    expect(coverage).toMatchObject({ totalPandals: 3, navigationReady: 1, needsReview: 1, unverified: 1, lowConfidence: 1 });
    expect(coverage.byPriority.S.needsReview).toBe(1);
    expect(coverage.byPriority.A.ready).toBe(1);
  });
});
