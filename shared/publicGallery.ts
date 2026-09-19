import type { PandalImage } from "./imageLibrary";
import { ALL_PANDALS, toPandalListItem, type PandalListItem } from "./pujaData";

const DISPLAYABLE_RIGHTS = new Set(["verified_open_license", "public_domain", "permission_granted"]);

export type PublicGalleryAsset = { pandal: PandalListItem; image: PandalImage; imageIndex: number; totalForPandal: number };

export const isPublicGalleryImage = (image: PandalImage) =>
  Boolean(image.url && image.sourceUrl && image.author && image.license) &&
  !image.url.startsWith("/manus-storage/pandal_") &&
  DISPLAYABLE_RIGHTS.has(image.rightsStatus ?? "") &&
  image.verificationStatus === "verified";

/** Derives cards from approved catalogue attachments; deduplicates exact duplicate image URLs/sources per pandal. */
export function buildPublicGalleryAssets(records: readonly PandalListItem[]): PublicGalleryAsset[] {
  const assets: PublicGalleryAsset[] = [];
  for (const pandal of records) {
    const rawImages = pandal.images && pandal.images.length > 0 ? pandal.images : pandal.image ? [pandal.image] : [];
    const seenImageKeys = new Set<string>();
    const uniqueEligibleImages: PandalImage[] = [];

    for (const img of rawImages) {
      if (!isPublicGalleryImage(img)) continue;

      const urlKey = `${pandal.id}:${img.url.toLowerCase().trim()}`;
      const sourceKey = img.sourceUrl ? `${pandal.id}:${img.sourceUrl.toLowerCase().trim()}` : "";

      if (seenImageKeys.has(urlKey) || (sourceKey && seenImageKeys.has(sourceKey))) {
        continue;
      }

      seenImageKeys.add(urlKey);
      if (sourceKey) seenImageKeys.add(sourceKey);

      uniqueEligibleImages.push(img);
    }

    uniqueEligibleImages.forEach((image, imageIndex) => {
      assets.push({ pandal, image, imageIndex, totalForPandal: uniqueEligibleImages.length });
    });
  }
  return assets;
}

export const PUBLIC_GALLERY_ASSETS = buildPublicGalleryAssets(ALL_PANDALS.map(toPandalListItem));
export const PUBLIC_GALLERY_SUMMARY = {
  reusablePhotographs: PUBLIC_GALLERY_ASSETS.length,
  photoBackedPandals: new Set(PUBLIC_GALLERY_ASSETS.map(asset => asset.pandal.id)).size,
} as const;
