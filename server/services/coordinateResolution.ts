import { getCoordinateCandidate, listCoordinateCandidates, upsertCoordinateCandidate } from "../db";
import { findPandal } from "./pandalCatalog";
import type { PandalRecord } from "../../shared/pujaData";
import { deriveCoordinatesFromAddress } from "../../shared/navigationMath";

type NominatimResult = { lat?: string; lon?: string; display_name?: string; osm_type?: string; osm_id?: number | string; address?: { city?: string; state?: string; country_code?: string; road?: string; suburb?: string; neighbourhood?: string; postcode?: string } };

const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";
const REQUEST_INTERVAL_MS = 1_200;
let lastRequestAt = 0;
type NavigableCoordinate = {
  recordId: string;
  latitudeE6: number;
  longitudeE6: number;
  source: string;
  query: string;
  displayName: string;
  verificationMethod: string;
  retrievedAt: Date;
  status: "resolved" | "approved";
  confidence: "high" | "medium" | "low" | "unverified";
  evidenceScore: number | null;
};
type CoordinateCandidateRows = NavigableCoordinate[];
let approvedCoordinateCache: CoordinateCandidateRows = [];
let approvedCoordinateCacheAt = 0;
let approvedCoordinateRefresh: Promise<CoordinateCandidateRows> | null = null;

async function approvedCoordinatesForPublicResponse() {
  const cacheIsFresh = Date.now() - approvedCoordinateCacheAt < 60_000;
  if (cacheIsFresh) return approvedCoordinateCache;
  if (!approvedCoordinateRefresh) {
    approvedCoordinateRefresh = Promise.all([listCoordinateCandidates("approved"), listCoordinateCandidates("resolved")]).then(([approved, resolved]) => {
      approvedCoordinateCache = [...approved, ...resolved].filter(coordinateIsNavigationEligible) as NavigableCoordinate[];
      approvedCoordinateCacheAt = Date.now();
      return approvedCoordinateCache;
    }).catch(() => approvedCoordinateCache).finally(() => { approvedCoordinateRefresh = null; });
  }
  return Promise.race<CoordinateCandidateRows>([
    approvedCoordinateRefresh,
    new Promise<CoordinateCandidateRows>(resolve => setTimeout(() => resolve(approvedCoordinateCache), 750)),
  ]);
}

export function coordinateQueries(name: string, address: string, subArea: string) {
  const heldAddress = address === "Information unavailable" ? "" : address;
  return Array.from(new Set([
    [name, heldAddress, "Kolkata", "West Bengal", "India"].filter(Boolean).join(", "),
    [heldAddress, "Kolkata", "West Bengal", "India"].filter(Boolean).join(", "),
    [name, subArea, "Kolkata", "India"].filter(Boolean).join(", "),
  ].filter(query => query.length > 8)));
}

export function scoreCandidate(result: NominatimResult, name: string, canonicalAddress = "") {
  const label = (result.display_name ?? "").toLocaleLowerCase();
  const nameTokens = name.toLocaleLowerCase().split(/[^a-z0-9]+/).filter(token => token.length > 3);
  const matchedTokens = nameTokens.filter(token => label.includes(token)).length;
  const inKolkata = label.includes("kolkata") || result.address?.city?.toLocaleLowerCase().includes("kolkata");
  const addressTokens = canonicalAddress.toLocaleLowerCase().split(/[^a-z0-9]+/).filter(token => token.length > 3 && !["kolkata", "west", "bengal", "india"].includes(token));
  const matchedAddressTokens = addressTokens.filter(token => label.includes(token)).length;
  const pincode = canonicalAddress.match(/\b\d{6}\b/)?.[0];
  const pincodeMatches = Boolean(pincode && (result.display_name?.includes(pincode) || result.address?.postcode === pincode));
  const nameMatchIsStrong = matchedTokens >= Math.min(2, Math.max(1, nameTokens.length));
  if (inKolkata && nameMatchIsStrong && (pincodeMatches || matchedAddressTokens >= 2)) return "high" as const;
  return inKolkata && (nameMatchIsStrong || matchedAddressTokens >= 2) ? "medium" as const : "low" as const;
}

async function waitForNominatimSlot() {
  const delay = Math.max(0, lastRequestAt + REQUEST_INTERVAL_MS - Date.now());
  if (delay) await new Promise(resolve => setTimeout(resolve, delay));
  lastRequestAt = Date.now();
}

export async function resolveCoordinateCandidate(recordId: string) {
  const pandal = findPandal(recordId);
  if (!pandal) return { state: "destination-unavailable" as const };
  if (pandal.latitude !== 0 && pandal.longitude !== 0 && pandal.coordinateConfidence === "high") {
    return { state: "destination-verified" as const, destinationName: pandal.name, destination: { lat: pandal.latitude, lng: pandal.longitude }, coordinateSource: pandal.coordinateSource ?? "catalogue", coordinateConfidence: "high" as const };
  }
  const stored = await getCoordinateCandidate(recordId);
  if (stored) return { state: coordinateIsNavigationEligible(stored) && stored.status === "approved" ? "destination-verified" as const : coordinateIsNavigationEligible(stored) && stored.status === "resolved" ? "destination-resolved" as const : "destination-candidate" as const, destinationName: pandal.name, candidate: stored };
  const queries = coordinateQueries(pandal.name, pandal.address, pandal.subArea);
  for (const query of queries) {
    await waitForNominatimSlot();
    const url = new URL(NOMINATIM_ENDPOINT);
    url.searchParams.set("q", query);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("countrycodes", "in");
    url.searchParams.set("viewbox", "88.18,22.72,88.52,22.44");
    url.searchParams.set("bounded", "1");
    try {
      const response = await fetch(url, { headers: { "User-Agent": "PujoParikroma/1.0 coordinate-review (catalogue only)", Accept: "application/json" }, signal: AbortSignal.timeout(12_000) });
      if (!response.ok) continue;
      const result = (await response.json() as NominatimResult[])[0];
      const latitude = Number(result?.lat); const longitude = Number(result?.lon);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !result?.display_name) continue;
      const confidence = scoreCandidate(result, pandal.name, pandal.address);
      const candidate = await upsertCoordinateCandidate({
        recordId,
        latitudeE6: Math.round(latitude * 1_000_000),
        longitudeE6: Math.round(longitude * 1_000_000),
        source: "nominatim",
        sourceUrl: url.toString(),
        query,
        displayName: result.display_name,
        osmType: result.osm_type ?? null,
        osmId: result.osm_id ? String(result.osm_id) : null,
        confidence,
        status: confidence === "high" ? "resolved" : "candidate",
        verificationMethod: confidence === "high" ? "address-resolved" : "nominatim-candidate",
      });
      return { state: confidence === "high" ? "destination-resolved" as const : "destination-candidate" as const, destinationName: pandal.name, candidate };
    } catch {
      // Keep the address-only fallback intact when the public resolver is unavailable.
    }
  }
  return { state: "destination-unresolved" as const, destinationName: pandal.name, address: pandal.address, mapSearchUrl: pandal.mapSearchUrl };
}


export async function getNavigationDestination(recordId: string, options: { allowCandidate?: boolean } = {}) {
  const pandal = findPandal(recordId);
  if (!pandal) return undefined;
  if (pandal.latitude !== 0 && pandal.longitude !== 0) {
    return { destination: { lat: pandal.latitude, lng: pandal.longitude }, destinationName: pandal.name, coordinateSource: pandal.coordinateSource ?? "catalogue", coordinateConfidence: pandal.coordinateConfidence ?? "high" as const };
  }
  let candidate = await getCoordinateCandidate(recordId);
  if (!candidate && options.allowCandidate) {
    const res = await resolveCoordinateCandidate(recordId);
    if (res.state === "destination-verified" && res.destination) {
      return { destination: res.destination, destinationName: pandal.name, coordinateSource: res.coordinateSource ?? "resolved", coordinateConfidence: "high" as const };
    }
    if ("candidate" in res && res.candidate) {
      candidate = res.candidate;
    }
  }
  if (candidate && (coordinateIsNavigationEligible(candidate) || (options.allowCandidate && candidate.status === "candidate"))) {
    return {
      destination: { lat: candidate.latitudeE6 / 1_000_000, lng: candidate.longitudeE6 / 1_000_000 },
      destinationName: pandal.name,
      coordinateSource: candidate.source,
      coordinateConfidence: candidate.status === "candidate" ? "needs-confirmation" as const : candidate.status === "resolved" ? "address-resolved" as const : "high" as const,
      coordinateVerificationMethod: candidate.verificationMethod,
      coordinateRetrievedAt: candidate.retrievedAt ? new Date(candidate.retrievedAt).toISOString() : new Date().toISOString(),
    };
  }
  if (options.allowCandidate) {
    const fallback = deriveCoordinatesFromAddress(pandal.address, pandal.subArea, pandal.section);
    return {
      destination: fallback,
      destinationName: pandal.name,
      coordinateSource: "address-locality-fallback",
      coordinateConfidence: "medium" as const,
    };
  }
  return undefined;
}

export async function withApprovedCoordinates<T extends PandalRecord>(records: T[]): Promise<T[]> {
  const approved = await approvedCoordinatesForPublicResponse();
  if (!approved.length) return records;
  const byRecordId = new Map<string, NavigableCoordinate>(approved.map(candidate => [candidate.recordId, candidate] as const));
  return records.map(record => {
    if (record.latitude !== 0 && record.longitude !== 0 && record.coordinateConfidence === "high") return record;
    const candidate = byRecordId.get(record.id);
    if (!candidate) return record;
    return {
      ...record,
      latitude: candidate.latitudeE6 / 1_000_000,
      longitude: candidate.longitudeE6 / 1_000_000,
      coordinateSource: candidate.source,
      coordinateRetrievedAt: candidate.retrievedAt.toISOString(),
      coordinateConfidence: candidate.status === "resolved" ? "medium" as const : "high" as const,
      coordinateQuery: candidate.query,
      coordinateDisplayName: candidate.displayName,
      coordinateVerificationMethod: candidate.verificationMethod,
    };
  });
}
