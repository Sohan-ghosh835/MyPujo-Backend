import { describe, expect, it } from "vitest";
import { ALL_PANDALS } from "@shared/pujaData";
import { APPROVED_PANDAL_IMAGES } from "@shared/generatedPandalImageManifest";
import { dedupePandalImages } from "@shared/imageLibrary";

describe("approved pandal image library", () => {
  it("attaches only managed, attribution-complete approved assets to their existing canonical records", () => {
    for (const [pandalId, images] of Object.entries(APPROVED_PANDAL_IMAGES)) {
      const record = ALL_PANDALS.find(item => item.id === pandalId);
      expect(record).toBeDefined();
      expect(images.length).toBeGreaterThan(0);
      expect(images.every(image => image.url.startsWith("/manus-storage/") && Boolean(image.author && image.license && image.licenseUrl && image.sourceUrl) && image.verificationStatus === "verified")).toBe(true);
      expect(record?.images).toEqual(expect.arrayContaining(images));
    }
  });

  it("deduplicates public image references by source and stored asset URL", () => {
    const sample = Object.values(APPROVED_PANDAL_IMAGES).flat()[0];
    expect(sample).toBeDefined();
    expect(dedupePandalImages([sample!, { ...sample! }, { ...sample!, sourceUrl: `${sample!.sourceUrl}#alternate` }])).toHaveLength(2);
  });

  it("does not treat private Amar Pujo records or unapproved review candidates as catalogue imagery", () => {
    expect(ALL_PANDALS.every(record => record.images?.every(image => image.verificationStatus === "verified" && image.url.startsWith("/manus-storage/")) ?? true)).toBe(true);
  });
});
