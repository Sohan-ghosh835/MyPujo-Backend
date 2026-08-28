import { describe, expect, it } from "vitest";
import { findNearbyPandals } from "../shared/proximity";

describe("nearby Pujo matching", () => {
  const records = [
    { id: "verified-near", name: "Verified near", subArea: "Kolkata", latitude: 22.5703, longitude: 88.3600, coordinateConfidence: "high" },
    { id: "verified-far", name: "Verified far", subArea: "Kolkata", latitude: 22.5730, longitude: 88.3600, coordinateConfidence: "high" },
    { id: "unverified", name: "Unverified", subArea: "Kolkata", latitude: 22.5701, longitude: 88.3600, coordinateConfidence: "source-only" },
  ];
  it("returns only verified high-confidence candidates within the configured radius, sorted by distance", () => {
    const results = findNearbyPandals(records, { lat: 22.5700, lng: 88.3600 }, { radiusMeters: 100, accuracyMeters: 20 });
    expect(results.map(result => result.id)).toEqual(["verified-near"]);
    expect(results[0].distanceMeters).toBeGreaterThan(20);
  });
  it("does not manufacture a nearby result when there is no verified coordinate match", () => {
    expect(findNearbyPandals(records.filter(record => record.id !== "verified-near"), { lat: 22.5700, lng: 88.3600 }, { radiusMeters: 100 })).toEqual([]);
  });
});
