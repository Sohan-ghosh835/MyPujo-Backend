export type ImagePeriod = "current" | "historical" | "contemporary" | "unknown";
export type ImageRightsStatus = "verified_open_license" | "public_domain" | "permission_granted" | "unknown" | "restricted" | "rejected";
export type ImageVerificationStatus = "verified" | "pending_visual_review" | "rejected" | "reference_only";

/** A public catalogue image. Personal Amar Pujo images must never use this type or enter this list. */
export type PandalImage = {
  id?: string;
  url: string;
  alt: string;
  author: string;
  license: string;
  licenseUrl?: string;
  sourceUrl: string;
  capturedYear?: number | null;
  imagePeriod?: ImagePeriod;
  source?: "wikimedia_commons" | "openverse" | "permission" | "legacy";
  rightsStatus?: ImageRightsStatus;
  verificationStatus?: ImageVerificationStatus;
  isPrimary?: boolean;
  candidateId?: string;
};

export function dedupePandalImages(images: PandalImage[]) {
  const seen = new Set<string>();
  return images.filter(image => {
    const key = `${image.sourceUrl}|${image.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
