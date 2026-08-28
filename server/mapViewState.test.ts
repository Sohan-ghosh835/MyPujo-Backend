import { describe, expect, it } from "vitest";
import { mapSelectionFor } from "../shared/mapViewState";
import { ALL_PANDALS } from "../shared/pujaData";

describe("map selection transitions", () => {
  it("keeps a coordinate-backed committee in pinned mode", () => {
    const collegeSquare = ALL_PANDALS.find(record => record.id === "pack-college-square-durga-puja");
    const state = mapSelectionFor(collegeSquare!);
    expect(state.mode).toBe("pinned");
    expect(state.addressPreview).toBeNull();
  });

  it("switches a supplied-address-only committee to address-preview mode", () => {
    const bagbazar = ALL_PANDALS.find(record => record.id === "address-bagbazar-sarbojanin-700003");
    const state = mapSelectionFor(bagbazar!);
    expect(state.mode).toBe("address-preview");
    expect(state.selected.name).toBe("Bagbazar Sarbojanin");
    expect(state.addressPreview?.mapSearchUrl).toContain("google.com/maps/search");
  });
});
