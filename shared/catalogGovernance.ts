export type AddressConfidence = "full" | "partial" | "unavailable";
export type AddressDetails = {
  raw: string;
  locality?: string;
  area?: string;
  city?: string;
  pincode?: string;
  confidence: AddressConfidence;
};

export type SourceMetadata = {
  label: string;
  url: string;
  type: "user-supplied dataset" | "official committee" | "public guide" | "licensed image" | "committee directions" | "discovery source" | "other public source";
  sourceDate?: string;
  retrievedAt?: string;
};

export const normalizePujaName = (name: string) => name
  .toLowerCase()
  .replace(/\b(durga\s*puja|durgotsab|durgotsav|durgotsob|sarbojanin|sarbojonin|sarbajanik|shree\s*shree|club|association)\b/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

export const normalizeSearchTerm = (value: string) => normalizePujaName(value)
  .replace(/baghbazar/g, "bagbazar")
  .replace(/shobhabazar/g, "sovabazar")
  .replace(/manicktala/g, "maniktala");

const pincodeFromId = (id: string) => id.match(/(?:^|-)(7\d{5})$/)?.[1];
const pincodeFromAddress = (address: string) => address.match(/\b(7\d{5})\b/)?.[1];

export function deriveAddressDetails(id: string, address: string, section: string, subArea: string): AddressDetails {
  if (!address || address === "Information unavailable") return { raw: "Information unavailable", confidence: "unavailable" };
  const pincode = pincodeFromAddress(address) ?? pincodeFromId(id);
  const hasStreetSignal = /\d|street|road|sarani|lane|avenue|path|park|square|block|bagan/i.test(address);
  return {
    raw: address,
    locality: subArea && subArea !== section ? subArea : undefined,
    area: section,
    city: /kolkata|howrah/i.test(address) ? address.match(/howrah/i) ? "Howrah" : "Kolkata" : undefined,
    pincode,
    confidence: hasStreetSignal && pincode ? "full" : "partial",
  };
}

export function classifySource(label: string, url: string): SourceMetadata["type"] {
  const value = `${label} ${url}`.toLowerCase();
  if (value.includes("pasted_content") || value.includes("user-provided") || value.includes("user supplied")) return "user-supplied dataset";
  if (value.includes("sharodiya")) return "discovery source";
  if (value.includes("wikimedia") || value.includes("commons")) return "licensed image";
  if (value.includes("direction") || value.includes("committee page")) return "committee directions";
  if (value.includes("clubmahindra") || value.includes("oberoi") || value.includes("lbb")) return "public guide";
  if (value.includes("committee") || value.includes("official")) return "official committee";
  return "other public source";
}
