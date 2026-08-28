import { describe, expect, it } from "vitest";
import { optimizeRoute } from "./routeOptimizer";

describe("optimizeRoute", () => {
  it("refuses to manufacture a South Kolkata route when sourced seasonal inputs are unavailable", () => {
    const result = optimizeRoute({
      startingPoint: "Gariahat",
      section: "South Kolkata",
      timeBudgetMinutes: 240,
      transportMode: "Metro + Walking",
      preferences: ["Most Famous", "Artistic"],
      crowdTolerance: "Balanced",
    });
    expect(result.totalMinutes).toBe(0);
    expect(result.stops).toHaveLength(0);
    expect(result.warnings.join(" ")).toContain("Verified 2026 route inputs are unavailable");
    expect(result.dataStatus).toBe("development");
  });

  it("keeps the same data-availability safeguard even for a short requested duration", () => {
    const result = optimizeRoute({
      startingPoint: "Gariahat",
      section: "South Kolkata",
      timeBudgetMinutes: 60,
      transportMode: "Walking",
      preferences: ["Most Famous"],
      crowdTolerance: "Low",
    });
    expect(result.totalMinutes).toBe(0);
    expect(result.warnings.join(" ")).toContain("Verified 2026 route inputs are unavailable");
  });
});
