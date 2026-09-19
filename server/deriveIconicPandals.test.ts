import { describe, it, expect } from "vitest";
import { deriveIconicPandals, getCategoryLabel, getCategoryColor } from "@shared/durgaPujoMapData";

describe("deriveIconicPandals", () => {
  it("returns only pandals with valid coordinates", () => {
    const iconics = deriveIconicPandals();
    for (const p of iconics) {
      expect(p.lat).not.toBe(0);
      expect(p.lng).not.toBe(0);
      expect(Number.isFinite(p.lat)).toBe(true);
      expect(Number.isFinite(p.lng)).toBe(true);
    }
  });

  it("marks all returned pandals with cat 'iconic'", () => {
    const iconics = deriveIconicPandals();
    expect(iconics.length).toBeGreaterThan(0);
    for (const p of iconics) {
      expect(p.cat).toBe("iconic");
    }
  });

  it("produces unique ids", () => {
    const iconics = deriveIconicPandals();
    const ids = iconics.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("getCategoryLabel handles iconic in both languages", () => {
    expect(getCategoryLabel("iconic", false)).toBe("Iconic Puja");
    expect(getCategoryLabel("iconic", true)).toBe("আইকনিক পুজো");
  });

  it("getCategoryColor returns purple for iconic", () => {
    expect(getCategoryColor("iconic")).toBe("#a855f7");
  });
});
