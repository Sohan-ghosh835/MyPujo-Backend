import { deriveCoordinatesFromAddress, haversineMeters, type GeoPoint } from "./navigationMath";

export type ShortlistCandidate = {
  id: string;
  name: string;
  address?: string;
  subArea?: string;
  section?: string;
  latitude?: number;
  longitude?: number;
  userRank?: number;
  priority?: "S" | "A" | "B" | "C";
  crowdEstimate?: "Low" | "Moderate" | "High" | "Very high";
  tags?: string[];
  visitorContext?: {
    lens?: string;
  };
};

export function toggleShortlistId(current: string[], id: string) {
  return current.includes(id) ? current.filter(item => item !== id) : [...current, id];
}

export function sortShortlist<T extends ShortlistCandidate>(records: T[]) {
  return [...records].sort((left, right) => (left.userRank ?? Number.MAX_SAFE_INTEGER) - (right.userRank ?? Number.MAX_SAFE_INTEGER) || left.name.localeCompare(right.name));
}

export type SmartItineraryOptions = {
  startingPoint?: string;
  section?: string;
  preferences?: string[];
  limit?: number;
};

export function generateSmartItinerary<T extends ShortlistCandidate>(records: T[], options: SmartItineraryOptions = {}) {
  if (!records.length) return [];
  const limit = options.limit ?? 5;
  const startingPoint = options.startingPoint || "";
  const section = options.section || "";
  const preferences = options.preferences || [];

  // Derive origin coordinates
  const originPos = deriveCoordinatesFromAddress(startingPoint, "", section);

  // Score each candidate
  const scored = records.map(pandal => {
    const pandalPos: GeoPoint = (pandal.latitude && pandal.longitude)
      ? { lat: pandal.latitude, lng: pandal.longitude }
      : deriveCoordinatesFromAddress(pandal.address ?? "", pandal.subArea ?? "", pandal.section ?? section);

    const distMeters = haversineMeters(originPos, pandalPos);
    const distKm = distMeters / 1000;

    // 1. Proximity score (closer to starting location = higher score)
    let proximityScore = 0;
    if (distKm <= 2.0) proximityScore = 20;
    else if (distKm <= 4.0) proximityScore = 14;
    else if (distKm <= 7.0) proximityScore = 8;
    else if (distKm <= 12.0) proximityScore = 3;
    else proximityScore = -5;

    // 2. Preference match score
    let preferenceScore = 0;
    if (preferences.includes("Most Famous")) {
      if (pandal.priority === "S") preferenceScore += 6;
      else if (pandal.priority === "A") preferenceScore += 4;
      else if (pandal.priority === "B") preferenceScore += 2;
    }
    if (preferences.includes("Artistic")) {
      if (pandal.visitorContext?.lens === "Artistry" || pandal.tags?.some(t => t.toLowerCase().includes("art"))) {
        preferenceScore += 6;
      }
    }
    if (preferences.includes("Traditional")) {
      if (pandal.visitorContext?.lens === "Heritage" || pandal.tags?.some(t => t.toLowerCase().includes("heritage") || t.toLowerCase().includes("traditional"))) {
        preferenceScore += 6;
      }
    }
    if (preferences.includes("Family Friendly")) {
      if (pandal.visitorContext?.lens === "Community" || pandal.tags?.some(t => t.toLowerCase().includes("community"))) {
        preferenceScore += 6;
      }
    }
    if (preferences.includes("Less Crowded")) {
      if (pandal.crowdEstimate === "Low" || pandal.crowdEstimate === "Moderate" || pandal.priority === "B" || pandal.priority === "C") {
        preferenceScore += 6;
      }
    }
    if (preferences.includes("Hidden Gems")) {
      if (pandal.priority === "A" || pandal.priority === "B" || pandal.priority === "C") {
        preferenceScore += 6;
      }
    }

    // 3. Base quality score (higher rank = slightly higher base score)
    const rankScore = Math.max(0, 15 - (pandal.userRank ?? 20));

    const totalScore = proximityScore + preferenceScore + rankScore;
    return { pandal, pandalPos, totalScore, distKm };
  });

  // Sort candidates by totalScore descending
  scored.sort((a, b) => b.totalScore - a.totalScore || a.distKm - b.distKm);

  // Pick top N candidates
  const selectedCandidates = scored.slice(0, Math.min(limit, scored.length));

  // 4. Sequential Nearest-Neighbor Routing Order (start at originPos, pick closest remaining stop)
  const orderedResult: T[] = [];
  const unvisited = [...selectedCandidates];
  let currentPos = originPos;

  while (unvisited.length > 0) {
    let bestIndex = 0;
    let bestDist = haversineMeters(currentPos, unvisited[0].pandalPos);

    for (let i = 1; i < unvisited.length; i++) {
      const dist = haversineMeters(currentPos, unvisited[i].pandalPos);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    }

    const nextPandal = unvisited.splice(bestIndex, 1)[0];
    orderedResult.push(nextPandal.pandal);
    currentPos = nextPandal.pandalPos;
  }

  return orderedResult;
}
