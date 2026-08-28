import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { IMAGE_SOURCE_LIBRARY, IMAGE_SOURCE_LIBRARY_SUMMARY } from "../shared/generatedImageSourceLibrary";
import { PUBLIC_GALLERY_ASSETS, PUBLIC_GALLERY_SUMMARY } from "../shared/publicGallery";

describe("Pujo image source library", () => {
  it("preserves all unique supplied records and makes each one linkable without treating public access as reuse permission", () => {
    expect(IMAGE_SOURCE_LIBRARY_SUMMARY.inputRows).toBe(162);
    expect(IMAGE_SOURCE_LIBRARY).toHaveLength(158);
    expect(new Set(IMAGE_SOURCE_LIBRARY.map(record => record.imageUrl)).size).toBe(158);
    expect(IMAGE_SOURCE_LIBRARY.every(record => record.sourceLinkAllowed && record.sourcePageUrl.startsWith("http"))).toBe(true);
    expect(IMAGE_SOURCE_LIBRARY_SUMMARY.duplicateInputRowsCollapsed).toBe(4);
  });

  it("keeps only evidence-complete reusable records gallery-eligible and leaves other records link-only", () => {
    const galleryEligible = IMAGE_SOURCE_LIBRARY.filter(record => record.galleryEligible);
    expect(galleryEligible).toHaveLength(4);
    expect(galleryEligible.every(record => record.rightsStatus === "licensed_for_reuse" && record.verificationStatus === "verified")).toBe(true);
    expect(IMAGE_SOURCE_LIBRARY.filter(record => record.rightsStatus !== "licensed_for_reuse").every(record => !record.galleryEligible)).toBe(true);
    expect(IMAGE_SOURCE_LIBRARY.filter(record => record.matchStatus === "ambiguous").every(record => record.matchedPandalId === null)).toBe(true);
  });

  it("implements a public link-only source page rather than rendering the source images", () => {
    const source = readFileSync(path.resolve(process.cwd(), "client/src/pages/ImageSources.tsx"), "utf8");
    expect(source).toContain("Open source");
    expect(source).toContain("restricted images are never copied, thumbnailed, proxied, or embedded");
    expect(source).not.toContain("<img");
    expect(source).toContain("pandalId");
  });

  it("derives complete-dataset dashboard counts from generated source and approved-gallery contracts", () => {
    const source = readFileSync(path.resolve(process.cwd(), "client/src/pages/ImageSources.tsx"), "utf8");
    expect(PUBLIC_GALLERY_SUMMARY.reusablePhotographs).toBe(PUBLIC_GALLERY_ASSETS.length);
    expect(IMAGE_SOURCE_LIBRARY.filter(record => !record.galleryEligible)).toHaveLength(154);
    expect(IMAGE_SOURCE_LIBRARY.filter(record => record.rightsStatus === "review_required")).toHaveLength(8);
    expect(IMAGE_SOURCE_LIBRARY.filter(record => record.sourceStatus === "unreachable")).toHaveLength(10);
    expect(source).toContain("IMAGE_SOURCE_LIBRARY_SUMMARY.inputRows");
    expect(source).toContain("IMAGE_SOURCE_LIBRARY_SUMMARY.duplicateInputRowsCollapsed");
    expect(source).toContain("PUBLIC_GALLERY_SUMMARY.reusablePhotographs");
    expect(source).toContain("sourceOnlyCount");
    expect(source).toContain("unreachableCount");
  });
});
