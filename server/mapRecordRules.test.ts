import { describe, expect, it } from "vitest";
import { findAddressPreviewRecords, hasSourceBackedCoordinate } from "../shared/mapRecordRules";
import { ALL_PANDALS } from "../shared/pujaData";

describe("map record rules", () => {
  it("distinguishes provenance-backed pins from address-only preview records", () => {
    const collegeSquare = ALL_PANDALS.find(record => record.id === "pack-college-square-durga-puja");
    const bagbazar = ALL_PANDALS.find(record => record.id === "address-bagbazar-sarbojanin-700003");
    expect(hasSourceBackedCoordinate(collegeSquare!)).toBe(true);
    expect(hasSourceBackedCoordinate(bagbazar!)).toBe(false);
  });

  it("makes every map-search record reachable through its name or address search", () => {
    const previews = findAddressPreviewRecords(ALL_PANDALS, "Bagbazar Street");
    expect(previews.map(record => record.name)).toContain("Bagbazar Sarbojanin");
    expect(findAddressPreviewRecords(ALL_PANDALS, "").length).toBeGreaterThan(250);
  });
});
