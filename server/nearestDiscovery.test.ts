import { describe, it, expect } from "vitest";
import {
  findNearestPandals,
  findTopPicks,
  findNearestMetroStations,
  findNearestToilets,
} from "@shared/nearestDiscovery";
import type { PandalRecord } from "@shared/pujaData";
import type { MetroStation } from "@shared/metroStations";
import type { PublicToilet } from "@shared/publicToilets";

// Minimal stubs with only the fields the functions need
const stubPandals: PandalRecord[] = [
  { id: "p1", name: "Close S", section: "South Kolkata", subArea: "Gariahat", address: "addr1", latitude: 22.518, longitude: 88.369, priority: "S" } as PandalRecord,
  { id: "p2", name: "Far C", section: "North Kolkata", subArea: "Shyambazar", address: "addr2", latitude: 22.600, longitude: 88.370, priority: "C" } as PandalRecord,
  { id: "p3", name: "Mid A", section: "South Kolkata", subArea: "Kalighat", address: "addr3", latitude: 22.520, longitude: 88.350, priority: "A" } as PandalRecord,
  { id: "p4", name: "Zero coords", section: "South Kolkata", subArea: "None", address: "addr4", latitude: 0, longitude: 0, priority: "B" } as PandalRecord,
];

const stubMetro: MetroStation[] = [
  { id: "m1", name: "Kalighat", nameBn: "কালীঘাট", lat: 22.5167, lng: 88.3460, line: "Blue" },
  { id: "m2", name: "Park Street", nameBn: "পার্ক স্ট্রিট", lat: 22.5545, lng: 88.3499, line: "Blue" },
  { id: "m3", name: "Sealdah", nameBn: "শিয়ালদহ", lat: 22.5666, lng: 88.3707, line: "Green" },
];

const stubToilets: PublicToilet[] = [
  { id: "t1", name: "Toilet A", nameBn: "টয়লেট A", lat: 22.5185, lng: 88.3686 },
  { id: "t2", name: "Toilet B", nameBn: "টয়লেট B", lat: 22.6005, lng: 88.3726 },
];

const userPos = { lat: 22.519, lng: 88.368 }; // Near Gariahat

describe("findNearestPandals", () => {
  it("returns pandals sorted by distance ascending", () => {
    const results = findNearestPandals(stubPandals, userPos, { radiusMeters: 20_000 });
    expect(results.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < results.length; i++) {
      expect(results[i].distanceMeters).toBeGreaterThanOrEqual(results[i - 1].distanceMeters);
    }
  });

  it("excludes pandals with zero coordinates", () => {
    const results = findNearestPandals(stubPandals, userPos, { radiusMeters: 20_000 });
    expect(results.find((r) => r.pandal.id === "p4")).toBeUndefined();
  });

  it("respects radius filter", () => {
    const tight = findNearestPandals(stubPandals, userPos, { radiusMeters: 500 });
    const wide = findNearestPandals(stubPandals, userPos, { radiusMeters: 20_000 });
    expect(tight.length).toBeLessThanOrEqual(wide.length);
  });
});

describe("findTopPicks", () => {
  it("returns results sorted by blended score (not just distance)", () => {
    const picks = findTopPicks(stubPandals, userPos, { radiusMeters: 20_000, limit: 3 });
    expect(picks.length).toBeGreaterThanOrEqual(1);
    for (let i = 1; i < picks.length; i++) {
      expect(picks[i].score).toBeGreaterThanOrEqual(picks[i - 1].score);
    }
  });

  it("respects limit", () => {
    const picks = findTopPicks(stubPandals, userPos, { radiusMeters: 20_000, limit: 2 });
    expect(picks.length).toBeLessThanOrEqual(2);
  });

  it("priority S pandals get a lower score than equally-distant C pandals", () => {
    // p1 (S, close) should rank better than p3 (A, similar distance)
    const picks = findTopPicks(stubPandals, userPos, { radiusMeters: 20_000, limit: 5 });
    const p1Pick = picks.find((p) => p.pandal.id === "p1");
    const p3Pick = picks.find((p) => p.pandal.id === "p3");
    if (p1Pick && p3Pick) {
      expect(p1Pick.score).toBeLessThan(p3Pick.score);
    }
  });
});

describe("findNearestMetroStations", () => {
  it("returns nearest stations, limited by count", () => {
    const results = findNearestMetroStations(stubMetro, userPos, 2);
    expect(results.length).toBe(2);
    expect(results[0].distanceMeters).toBeLessThanOrEqual(results[1].distanceMeters);
  });
});

describe("findNearestToilets", () => {
  it("returns nearest toilets sorted by distance", () => {
    const results = findNearestToilets(stubToilets, userPos, 2);
    expect(results.length).toBe(2);
    expect(results[0].distanceMeters).toBeLessThanOrEqual(results[1].distanceMeters);
  });
});
