import { describe, it, expect } from "vitest";
import { generateSectionTrails } from "@shared/pandalHoppingTrails";
import type { PandalRecord } from "@shared/pujaData";

const stubPandals: PandalRecord[] = [
  { id: "a1", name: "Pandal Alpha", section: "South Kolkata", subArea: "Gariahat", address: "addr", latitude: 22.518, longitude: 88.369, priority: "S", userRank: 1 } as PandalRecord,
  { id: "a2", name: "Pandal Beta", section: "South Kolkata", subArea: "Kalighat", address: "addr", latitude: 22.517, longitude: 88.346, priority: "A", userRank: 2 } as PandalRecord,
  { id: "a3", name: "Pandal Gamma", section: "South Kolkata", subArea: "Deshapriya", address: "addr", latitude: 22.524, longitude: 88.351, priority: "B", userRank: 3 } as PandalRecord,
  { id: "b1", name: "Pandal Delta", section: "North Kolkata", subArea: "Bagbazar", address: "addr", latitude: 22.597, longitude: 88.365, priority: "S", userRank: 1 } as PandalRecord,
  { id: "b2", name: "Pandal Epsilon", section: "North Kolkata", subArea: "Shyambazar", address: "addr", latitude: 22.601, longitude: 88.370, priority: "A", userRank: 2 } as PandalRecord,
  { id: "zero", name: "No Coords", section: "South Kolkata", subArea: "None", address: "addr", latitude: 0, longitude: 0, priority: "S", userRank: 0 } as PandalRecord,
];

describe("generateSectionTrails", () => {
  it("generates one trail per qualifying section", () => {
    const trails = generateSectionTrails(stubPandals);
    const sections = trails.map((t) => t.section);
    expect(sections).toContain("South Kolkata");
    expect(sections).toContain("North Kolkata");
  });

  it("excludes pandals with zero coordinates", () => {
    const trails = generateSectionTrails(stubPandals);
    for (const trail of trails) {
      expect(trail.pandalNames).not.toContain("No Coords");
    }
  });

  it("respects maxPerSection limit", () => {
    const trails = generateSectionTrails(stubPandals, { maxPerSection: 2 });
    for (const trail of trails) {
      expect(trail.pandalCount).toBeLessThanOrEqual(2);
    }
  });

  it("generates valid Google Maps URL", () => {
    const trails = generateSectionTrails(stubPandals);
    for (const trail of trails) {
      expect(trail.url).toMatch(/^https:\/\/www\.google\.com\/maps\/dir\//);
      expect(trail.url).toContain("destination=");
    }
  });

  it("skips sections with fewer than 2 qualifying pandals", () => {
    const singlePandal: PandalRecord[] = [
      { id: "x1", name: "Lonely", section: "New Town", subArea: "Eco Park", address: "addr", latitude: 22.610, longitude: 88.470, priority: "S", userRank: 1 } as PandalRecord,
    ];
    const trails = generateSectionTrails(singlePandal);
    expect(trails.find((t) => t.section === "New Town")).toBeUndefined();
  });

  it("returns sectionBn alongside section", () => {
    const trails = generateSectionTrails(stubPandals);
    const south = trails.find((t) => t.section === "South Kolkata");
    expect(south?.sectionBn).toBe("দক্ষিণ কলকাতা");
  });
});
