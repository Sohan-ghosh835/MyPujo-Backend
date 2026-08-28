import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PUJO_GALLERY_FEATURES } from "../shared/pujoGallery";
import { PUBLIC_GALLERY_ASSETS, PUBLIC_GALLERY_SUMMARY } from "../shared/publicGallery";

describe("Pujo Gallery source safeguards", () => {
  it("contains only managed, source-attributed, reusable festival-context images", () => {
    expect(PUJO_GALLERY_FEATURES.length).toBeGreaterThan(0);
    for (const image of PUJO_GALLERY_FEATURES) {
      expect(image.author.length).toBeGreaterThan(0);
      expect(image.sourceKind).toBe("festival-context");
    }
  });

  it("derives the independent full gallery from every approved reusable catalogue attachment", () => {
    expect(PUBLIC_GALLERY_SUMMARY.reusablePhotographs).toBe(PUBLIC_GALLERY_ASSETS.length);
    expect(PUBLIC_GALLERY_ASSETS.length).toBeGreaterThan(0);
    expect(PUBLIC_GALLERY_SUMMARY.photoBackedPandals).toBe(new Set(PUBLIC_GALLERY_ASSETS.map(asset => asset.pandal.id)).size);
    expect(new Set(PUBLIC_GALLERY_ASSETS.map(asset => asset.image.sourceUrl || asset.image.url)).size).toBe(PUBLIC_GALLERY_ASSETS.length);
  });

  it("renders exclusively the festival-context photographs in the Pujo Gallery view", () => {
    const source = readFileSync(path.resolve(process.cwd(), "client/src/components/PujoGallery.tsx"), "utf8");
    expect(source).toContain("Festival moments");
    expect(source).toContain("PUJO_GALLERY_FEATURES.length");
    expect(source).not.toContain("PUBLIC_GALLERY_ASSETS");
  });
});
