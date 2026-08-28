export type CoordinateDecision = "approved" | "resolved" | "review_required" | "rejected";

export type CoordinateEvidenceInput = {
  canonicalName: string;
  aliases?: string[];
  canonicalAddress: string;
  locality?: string;
  section?: string;
  landmark?: string | null;
  pincode?: string | null;
  query: string;
  displayName: string;
  osmType: string | null;
  latitude: number;
  longitude: number;
};

const normalize = (value: string) => value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const words = (value: string) => normalize(value).split(" ").filter(word => word.length >= 4 && !["durga", "puja", "pandal", "club", "sangha", "sarbojanin"].includes(word));
const hasAll = (haystack: string, needles: string[]) => needles.length > 0 && needles.every(word => haystack.includes(word));
const inKolkataBounds = (latitude: number, longitude: number) => latitude >= 22.44 && latitude <= 22.72 && longitude >= 88.18 && longitude <= 88.52;

export function evaluateCoordinateEvidence(input: CoordinateEvidenceInput) {
  const sourceText = normalize(`${input.query} ${input.displayName}`);
  const identityTerms = Array.from(new Set([...words(input.canonicalName), ...(input.aliases ?? []).flatMap(words)])).slice(0, 6);
  const identity = hasAll(sourceText, identityTerms.slice(0, Math.min(2, identityTerms.length)));
  const localityTerms = Array.from(new Set([...words(input.locality ?? ""), ...words(input.section ?? ""), ...words(input.landmark ?? "")])).slice(0, 4);
  const locality = localityTerms.length === 0 || localityTerms.some(term => sourceText.includes(term));
  const pincode = input.pincode?.trim() ?? "";
  const pincodeMatch = !pincode || sourceText.includes(normalize(pincode));
  const exactAddress = words(input.canonicalAddress).filter(word => sourceText.includes(word)).length >= 2;
  const sourceIsNamedPlace = input.osmType === "node";
  const inBounds = inKolkataBounds(input.latitude, input.longitude);
  const evidence = { identity, locality, pincode: pincodeMatch, exactAddress, sourceIsNamedPlace, inBounds, pincodeValue: pincode || null };
  if (!inBounds) return { decision: "rejected" as const, reason: "Coordinate lies outside the bounded Kolkata verification area.", evidence };
  if (identity && locality && pincodeMatch && sourceIsNamedPlace) return { decision: "approved" as const, reason: "Exact canonical name, locality, pincode, and named-place source evidence agree.", evidence };
  if (identity && locality && exactAddress && pincodeMatch) return { decision: "resolved" as const, reason: "Canonical name and address evidence agree, but the source is weaker than a named-place verification.", evidence };
  return { decision: "review_required" as const, reason: "Identity, address, locality, pincode, or named-place evidence is incomplete or conflicting; no automatic navigation approval is safe.", evidence };
}

export function coordinateStatusLabel(status: "candidate" | "approved" | "resolved" | "review_required" | "rejected" | "unresolved") {
  if (status === "approved") return "VERIFIED";
  if (status === "resolved") return "RESOLVED";
  if (status === "rejected") return "REJECTED";
  return "REVIEW_REQUIRED";
}
