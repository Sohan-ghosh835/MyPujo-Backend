import { describe, expect, it } from "vitest";
import { generateSmartItinerary, sortShortlist, toggleShortlistId } from "../shared/shortlistRules";

describe("personal shortlist rules", () => {
  it("adds and removes a saved pandal without duplicating its id", () => {
    expect(toggleShortlistId([], "bagbazar")).toEqual(["bagbazar"]);
    expect(toggleShortlistId(["bagbazar"], "bagbazar")).toEqual([]);
  });

  it("orders a personal parikrama by supplied rank before alphabetical fallback", () => {
    const result = sortShortlist([
      { id: "later", name: "Zed Club", userRank: 9 },
      { id: "first", name: "Bagbazar", userRank: 1 },
      { id: "unranked", name: "Alpha Club" },
    ]);
    expect(result.map(record => record.id)).toEqual(["first", "later", "unranked"]);
  });

  it("generates a smart itinerary prioritized by proximity to starting point", () => {
    const candidates = [
      { id: "north-1", name: "Bagbazar Sarbojanin", address: "Bagbazar, Kolkata", latitude: 22.6022, longitude: 88.3662 },
      { id: "south-1", name: "Ekdalia Evergreen", address: "Gariahat, Kolkata", latitude: 22.5192, longitude: 88.3678 },
      { id: "saltlake-1", name: "FD Block Salt Lake", address: "Salt Lake, Kolkata", latitude: 22.5867, longitude: 88.4171 },
    ];

    const gariahatRoute = generateSmartItinerary(candidates, { startingPoint: "Gariahat", limit: 2 });
    expect(gariahatRoute[0].id).toBe("south-1");

    const saltLakeRoute = generateSmartItinerary(candidates, { startingPoint: "Salt Lake", limit: 2 });
    expect(saltLakeRoute[0].id).toBe("saltlake-1");
  });
});
