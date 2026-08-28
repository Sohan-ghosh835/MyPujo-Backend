import type { CrowdLevel, PandalRecord, Section, TransportMode } from "../../shared/pujaData";
import { listPandals } from "./pandalCatalog";

export type RoutePreferences = "Most Famous" | "Artistic" | "Traditional" | "Family Friendly" | "Less Crowded" | "Hidden Gems";
export type RouteRequest = {
  startingPoint: string;
  section: Section | "All Kolkata";
  timeBudgetMinutes: number;
  transportMode: TransportMode;
  preferences: RoutePreferences[];
  crowdTolerance: "Low" | "Balanced" | "High";
};

export type RouteStop = {
  order: number;
  pandal: PandalRecord;
  travelMinutes: number;
  walkingMinutes: number;
  queueMinutes: number;
  visitMinutes: number;
  arrivalOffsetMinutes: number;
};

export type RouteResult = {
  stops: RouteStop[];
  skipped: PandalRecord[];
  totalMinutes: number;
  totalDistanceKm: number;
  totalTravelMinutes: number;
  totalWalkingMinutes: number;
  totalQueueMinutes: number;
  totalVisitMinutes: number;
  routeScore: number;
  warnings: string[];
  rationale: string[];
  dataStatus: "development";
};

const originBySection: Record<string, { lat: number; lng: number }> = {
  "South Kolkata": { lat: 22.519, lng: 88.36 },
  "North Kolkata": { lat: 22.606, lng: 88.365 },
  "Central Kolkata": { lat: 22.576, lng: 88.364 },
  "Salt Lake": { lat: 22.587, lng: 88.416 },
  "All Kolkata": { lat: 22.5726, lng: 88.3639 },
};

function kmBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const r = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLon = toRadians(b.lng - a.lng);
  const distance = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLon / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(distance), Math.sqrt(1 - distance));
}

function crowdPenalty(crowd: CrowdLevel, tolerance: RouteRequest["crowdTolerance"]) {
  const base = crowd === "Very high" ? 16 : crowd === "High" ? 10 : crowd === "Moderate" ? 5 : crowd === "Low" ? 2 : 0;
  return tolerance === "Low" ? base : tolerance === "Balanced" ? Math.round(base * 0.6) : Math.round(base * 0.25);
}

function pandalValue(pandal: PandalRecord, preferences: RoutePreferences[], crowdTolerance: RouteRequest["crowdTolerance"]) {
  let value = pandal.popularity * 0.3 + pandal.rating * 10 * 0.16 + pandal.artistic * 0.2 + pandal.traditional * 0.08 + pandal.family * 0.08;
  if (preferences.includes("Most Famous")) value += pandal.popularity * 0.18;
  if (preferences.includes("Artistic")) value += pandal.artistic * 0.2;
  if (preferences.includes("Traditional")) value += pandal.traditional * 0.2;
  if (preferences.includes("Family Friendly")) value += pandal.family * 0.16;
  if (preferences.includes("Less Crowded")) value -= crowdPenalty(pandal.crowd, "Low") * 2;
  if (preferences.includes("Hidden Gems")) value += (100 - pandal.popularity) * 0.13 + pandal.artistic * 0.08;
  return value - crowdPenalty(pandal.crowd, crowdTolerance);
}

function transportEstimate(distanceKm: number, mode: TransportMode) {
  const speedKmh = mode === "Walking" ? 4.2 : mode === "Metro + Walking" ? 20 : mode === "Car" || mode === "Bike" ? 18 : mode === "Public Transport" ? 14 : 11;
  const transfer = mode === "Metro + Walking" ? 8 : mode === "Public Transport" ? 5 : 0;
  const travelMinutes = Math.max(4, Math.round((distanceKm / speedKmh) * 60) + transfer);
  const walkingMinutes = mode === "Walking" ? travelMinutes : Math.max(3, Math.round(distanceKm * (mode === "Metro + Walking" ? 5 : 2.4)));
  return { travelMinutes, walkingMinutes };
}

export function optimizeRoute(request: RouteRequest): RouteResult {
  const candidates = listPandals({ section: request.section });
  if (!candidates.some(pandal => pandal.latitude !== 0 && pandal.longitude !== 0 && pandal.visitMinutes > 0)) {
    return {
      stops: [], skipped: candidates, totalMinutes: 0, totalDistanceKm: 0, totalTravelMinutes: 0, totalWalkingMinutes: 0, totalQueueMinutes: 0, totalVisitMinutes: 0, routeScore: 0,
      warnings: ["Verified 2026 route inputs are unavailable for these sourced committee records. PujoPath will not generate a real-world route until season-specific location, timing, and visit data is published."],
      rationale: ["Real committee identities are shown with source attribution, while operational data is deliberately withheld until verified."], dataStatus: "development",
    };
  }
  const ranked = [...candidates].sort((a, b) => pandalValue(b, request.preferences, request.crowdTolerance) - pandalValue(a, request.preferences, request.crowdTolerance));
  const origin = originBySection[request.section] ?? originBySection["All Kolkata"];
  let current = origin;
  let elapsed = 0;
  let totalDistanceKm = 0;
  let totalTravelMinutes = 0;
  let totalWalkingMinutes = 0;
  let totalQueueMinutes = 0;
  let totalVisitMinutes = 0;
  const stops: RouteStop[] = [];
  const skipped: PandalRecord[] = [];

  for (const pandal of ranked) {
    const distanceKm = kmBetween(current, { lat: pandal.latitude, lng: pandal.longitude });
    const estimate = transportEstimate(distanceKm, request.transportMode);
    const queueMinutes = pandal.waitMinutes + crowdPenalty(pandal.crowd, request.crowdTolerance);
    const stopCost = estimate.travelMinutes + queueMinutes + pandal.visitMinutes + 4;
    if (elapsed + stopCost > request.timeBudgetMinutes) {
      skipped.push(pandal);
      continue;
    }
    elapsed += stopCost;
    totalDistanceKm += distanceKm;
    totalTravelMinutes += estimate.travelMinutes;
    totalWalkingMinutes += estimate.walkingMinutes;
    totalQueueMinutes += queueMinutes;
    totalVisitMinutes += pandal.visitMinutes;
    stops.push({
      order: stops.length + 1,
      pandal,
      travelMinutes: estimate.travelMinutes,
      walkingMinutes: estimate.walkingMinutes,
      queueMinutes,
      visitMinutes: pandal.visitMinutes,
      arrivalOffsetMinutes: elapsed - queueMinutes - pandal.visitMinutes,
    });
    current = { lat: pandal.latitude, lng: pandal.longitude };
  }

  const warnings: string[] = ["Development-only data is in use. Locations, crowd estimates, opening hours, and routes are not for real-world navigation."];
  if (stops.length === 0) warnings.push("The selected time budget cannot fit the available development samples. Increase time or change the section.");
  if (skipped.length) warnings.push(`${skipped.length} additional sample ${skipped.length === 1 ? "pandal was" : "pandals were"} excluded to respect your time budget.`);
  if (request.transportMode === "Walking" && totalWalkingMinutes > 65) warnings.push("This route includes a substantial walking estimate. Consider Metro + Walking or a longer time budget.");

  return {
    stops,
    skipped,
    totalMinutes: elapsed,
    totalDistanceKm: Number(totalDistanceKm.toFixed(1)),
    totalTravelMinutes,
    totalWalkingMinutes,
    totalQueueMinutes,
    totalVisitMinutes,
    routeScore: stops.length ? Math.min(96, Math.round(74 + stops.reduce((total, stop) => total + pandalValue(stop.pandal, request.preferences, request.crowdTolerance), 0) / (stops.length * 10))) : 0,
    warnings,
    rationale: [
      `${stops.length} sample pandals were selected within the ${request.timeBudgetMinutes}-minute budget.`,
      `${request.preferences.length ? request.preferences.join(" and ") : "Balanced"} preferences influenced each stop score.`,
      `${totalTravelMinutes} minutes of transport, ${totalQueueMinutes} minutes of queue allowance, and ${totalVisitMinutes} minutes of visit time are included.`,
    ],
    dataStatus: "development",
  };
}
