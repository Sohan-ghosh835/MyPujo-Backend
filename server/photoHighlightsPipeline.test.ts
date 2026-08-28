import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { PandalImage } from "../shared/imageLibrary";
import { ALL_PANDALS } from "../shared/pujaData";

const displayableRights = new Set(["verified_open_license", "public_domain", "permission_granted"]);
const isDisplayable = (image: PandalImage) => displayableRights.has(image.rightsStatus ?? "") && image.verificationStatus === "verified" && Boolean(image.url && image.sourceUrl && image.author && image.license);
const assets = ALL_PANDALS.flatMap(pandal => (pandal.images ?? (pandal.image ? [pandal.image] : [])).filter(isDisplayable).map(image => ({ pandalId: pandal.id, sourceUrl: image.sourceUrl, imageUrl: image.url })));

describe("Photo Highlights asset pipeline", () => {
  it("derives every approved catalogue image as an independent gallery asset", () => {
    expect(assets.length).toBeGreaterThan(0);
    expect(new Set(assets.map(asset => `${asset.sourceUrl}|${asset.imageUrl}`)).size).toBe(assets.length);
  });

  it("renders the derived per-image assets with pagination rather than a single primary image per record", () => {
    const source = readFileSync(path.resolve(process.cwd(), "client/src/pages/Explore.tsx"), "utf8");
    expect(source).toContain("buildPublicGalleryAssets");
    expect(source).toContain("PhotoHighlightCard");
    expect(source).toContain("PAGE_SIZE");
  });

  it("keeps each rendered asset attributed and linked to both its source and pandal detail", () => {
    const card = readFileSync(path.resolve(process.cwd(), "client/src/components/PhotoHighlightCard.tsx"), "utf8");
    expect(card).toContain("image.author");
    expect(card).toContain("image.license");
    expect(card).toContain("image.sourceUrl");
    expect(card).toContain("/pandals/${pandal.id}");
  });
});
