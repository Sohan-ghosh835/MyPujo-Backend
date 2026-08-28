import { describe, expect, it } from "vitest";
import { CURATED_MAPS } from "../client/src/components/CuratedPujaMap";

describe("curated Puja Map", () => {
  it("includes the original Google My Maps embed as the first carousel entry", () => {
    expect(CURATED_MAPS[0].url).toBe("https://www.google.com/maps/d/embed?mid=1GQ8KBEuldEMnoAmccpMiNdoHX-M8UQI&ehbc=2E312F");
    expect(CURATED_MAPS[0].url).not.toContain("directions");
  });

  it("has exactly 5 curated maps in the carousel", () => {
    expect(CURATED_MAPS).toHaveLength(5);
    for (const m of CURATED_MAPS) {
      expect(m.url).toMatch(/^https:\/\/www\.google\.com\/maps\/d\/embed/);
      expect(m.id).toBeTruthy();
      expect(m.labelEn).toBeTruthy();
    }
  });
});
