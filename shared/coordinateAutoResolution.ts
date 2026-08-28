export type OSMCoordinateEvidence = { id: string; type: "node" | "way" | "relation"; latitude: number; longitude: number; tags?: Record<string, string> };
export type CoordinateAutoOutcome = "approved" | "resolved" | "review_required" | "rejected" | "unresolved";

const normalize = (value: string) => value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const ignored = new Set(["durga", "puja", "pandal", "club", "sangha", "sarbojanin", "durgotsav", "durgapuja", "kolkata", "west", "bengal", "india", "road", "street", "lane"]);
const tokens = (value: string) => normalize(value).split(" ").filter(token => (token.length >= 3 || /^\d+$/.test(token)) && !ignored.has(token));
const sourceText = (evidence: OSMCoordinateEvidence) => Object.values(evidence.tags ?? {}).join(" ").toLocaleLowerCase();

export function scoreAutomaticCoordinate(input: { name: string; aliases?: string[]; address: string; subArea: string; pincode?: string; evidence: OSMCoordinateEvidence }) {
  const name = evidenceName(input.evidence);
  const candidateName = normalize(name);
  const aliasMatches = [input.name, ...(input.aliases ?? [])].map(value => tokens(value)).filter(values => values.length >= 2).some(values => values.every(value => candidateName.includes(value)));
  const source = sourceText(input.evidence);
  const addressTokens = tokens(input.address).filter(token => token.length >= 4 || /^\d+$/.test(token));
  const addressMatch = addressTokens.length > 0 && addressTokens.filter(token => source.includes(token)).length >= Math.min(2, addressTokens.length);
  const localityTokens = tokens(input.subArea).filter(token => token.length >= 4);
  const localityMatch = localityTokens.length > 0 && localityTokens.some(token => source.includes(token));
  const pincodeMatch = Boolean(input.pincode && source.includes(input.pincode));
  const cityMatch = /\bkolkata\b/.test(source) || (input.evidence.latitude >= 22.44 && input.evidence.latitude <= 22.72 && input.evidence.longitude >= 88.18 && input.evidence.longitude <= 88.52);
  const score = (aliasMatches ? 40 : 0) + (addressMatch ? 25 : 0) + (localityMatch ? 15 : 0) + (pincodeMatch ? 10 : 0) + (cityMatch ? 10 : 0);
  const outcome: CoordinateAutoOutcome = score >= 90 ? "approved" : score >= 75 ? "resolved" : score >= 50 ? "review_required" : aliasMatches ? "rejected" : "unresolved";
  const reason = `Name ${aliasMatches ? "matched" : "did not match"} (${aliasMatches ? 40 : 0}/40); address ${addressMatch ? "matched" : "did not match"} (${addressMatch ? 25 : 0}/25); locality ${localityMatch ? "matched" : "did not match"} (${localityMatch ? 15 : 0}/15); pincode ${pincodeMatch ? "matched" : "did not match"} (${pincodeMatch ? 10 : 0}/10); Kolkata ${cityMatch ? "matched" : "did not match"} (${cityMatch ? 10 : 0}/10).`;
  return { outcome, score, reason, matchEvidence: { aliasMatches, addressMatch, localityMatch, pincodeMatch, cityMatch } };
}

export function evidenceName(evidence: OSMCoordinateEvidence) { return evidence.tags?.name ?? evidence.tags?.["name:en"] ?? ""; }

export function priorityOrder(priority?: "S" | "A" | "B" | "C") { return priority === "S" ? 0 : priority === "A" ? 1 : priority === "B" ? 2 : 3; }
