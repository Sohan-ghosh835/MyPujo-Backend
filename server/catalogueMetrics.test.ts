import { describe, expect, it } from "vitest";
import { getDataCompleteness, getVerificationLevel } from "../shared/catalogueMetrics";
import { findPandal } from "./services/pandalCatalog";

describe("catalogue data metrics", () => {
  it("keeps completeness separate from supplied rank and rewards only evidenced fields", () => {
    const coordinateRecord = findPandal("pack-college-square-durga-puja");
    const addressOnlyRecord = findPandal("sharodiya-11-pally-durga-deul");
    expect(coordinateRecord).toBeTruthy();
    expect(addressOnlyRecord).toBeTruthy();
    expect(getDataCompleteness(coordinateRecord!)).toBeGreaterThan(getDataCompleteness(addressOnlyRecord!));
    expect(getVerificationLevel(coordinateRecord!)).toBe(2);
    expect(getVerificationLevel(addressOnlyRecord!)).toBe(1);
  });
});
