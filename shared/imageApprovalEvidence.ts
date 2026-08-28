export type VisualEvidence = {
  content: "pandal" | "durga_idol" | "decorative_detail" | "crowd_or_street" | "unclear_or_other";
  committeeNameVisible: boolean;
  visibleText: string;
  visualQuality: "usable" | "unclear" | "poor";
  visualConfidence: number;
  contradiction: boolean;
  rationale: string;
};

export type ImageApprovalEvidenceInput = {
  sourcePageReachable: boolean;
  reusableLicense: boolean;
  attributionComplete: boolean;
  technicalQualityScore: number | null;
  contentType: string | null;
  width: number | null;
  height: number | null;
  matchConfidence: number;
  exactTextualIdentity: boolean;
  alreadyPublicSource: boolean;
  visual: VisualEvidence | null;
};

export type ImageApprovalDecision = "approved" | "review_required" | "rejected" | "unreachable" | "duplicate";

export function decideImageApproval(input: ImageApprovalEvidenceInput) {
  if (input.alreadyPublicSource) return { decision: "duplicate" as const, reason: "The exact Commons source is already represented in the public image manifest." };
  if (!input.sourcePageReachable) return { decision: "unreachable" as const, reason: "The official Commons metadata endpoint could not retrieve this source page." };
  if (!input.reusableLicense || !input.attributionComplete) return { decision: "rejected" as const, reason: "Reusable licence, licence URL, or attribution is incomplete or not acceptable for publication." };
  if (!input.contentType?.startsWith("image/") || !input.width || !input.height || (input.technicalQualityScore ?? 0) < 70) return { decision: "review_required" as const, reason: "Technical image metadata is incomplete or does not meet the minimum public-quality threshold." };
  if (input.visual?.contradiction || input.visual?.content === "crowd_or_street" || input.visual?.content === "unclear_or_other") return { decision: "rejected" as const, reason: "Visual review contradicts use as a specific pandal or idol image for the canonical record." };
  if (!input.exactTextualIdentity || input.matchConfidence < 90) return { decision: "review_required" as const, reason: "The Commons filename/source evidence does not establish an exact canonical committee or address identity." };
  if (!input.visual || input.visual.visualQuality !== "usable" || input.visual.visualConfidence < 80 || !["pandal", "durga_idol", "decorative_detail"].includes(input.visual.content)) return { decision: "review_required" as const, reason: "Visual review is inconclusive or does not provide sufficient supplemental support for publication." };
  return { decision: "approved" as const, reason: "Official Commons metadata, reusable rights, exact source-title identity, technical quality, and a non-contradictory usable visual review all agree." };
}

export function hasExactFilenameIdentity(canonicalName: string, aliases: string[], filename: string) {
  const normalize = (value: string) => value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const ignored = new Set(["durga", "puja", "pandal", "club", "sangha", "sarbojanin", "sarbojanin", "sarbojanin", "durgotsav", "durgapuja", "durgapujo"]);
  const title = normalize(filename);
  const candidates = [canonicalName, ...aliases].map(value => normalize(value).split(" ").filter(token => (token.length >= 2 || /^\d+$/.test(token)) && !ignored.has(token)));
  return candidates.some(tokens => tokens.length >= 2 && tokens.every(token => title.includes(token)));
}
