import { findPandal } from "./pandalCatalog";
import { getNavigationDestination } from "./coordinateResolution";
import type { RouteInstruction } from "../../shared/navigationPresentation";

export type RouteMode = "walking" | "driving";
const profileByMode: Record<RouteMode, string> = { walking: "foot-walking", driving: "driving-car" };

export async function estimateRouteToPandal(input: { recordId: string; originLat: number; originLng: number; mode: RouteMode; allowCandidate?: boolean }) {
  const pandal = findPandal(input.recordId);
  if (!pandal) return { state: "destination-unavailable" as const };
  const resolvedDestination = await getNavigationDestination(input.recordId, { allowCandidate: input.allowCandidate });
  if (!resolvedDestination) {
    return { state: "destination-unverified" as const, destinationName: pandal.name, address: pandal.address, mapSearchUrl: pandal.mapSearchUrl };
  }
  const key = process.env.OPENROUTESERVICE_API_KEY;
  if (!key) return { state: "service-unavailable" as const, destinationName: pandal.name, mapSearchUrl: pandal.mapSearchUrl };
  try {
    const endpoint = `https://api.openrouteservice.org/v2/directions/${profileByMode[input.mode]}?start=${input.originLng},${input.originLat}&end=${resolvedDestination.destination.lng},${resolvedDestination.destination.lat}&instructions=true`;
    const response = await fetch(endpoint, { headers: { Authorization: key }, signal: AbortSignal.timeout(12_000) });
    if (!response.ok) return { state: "service-unavailable" as const, destinationName: pandal.name, mapSearchUrl: pandal.mapSearchUrl, providerStatus: response.status };
    const payload = await response.json() as { features?: Array<{ properties?: { summary?: { distance?: number; duration?: number }; segments?: Array<{ steps?: Array<{ instruction?: string; distance?: number; way_points?: unknown }> }> }; geometry?: { coordinates?: unknown } }> };
    const feature = payload.features?.[0];
    const summary = feature?.properties?.summary;
    if (!summary || !Number.isFinite(summary.distance) || !Number.isFinite(summary.duration)) return { state: "no-route" as const, destinationName: pandal.name, mapSearchUrl: pandal.mapSearchUrl };
    const distance = summary.distance as number;
    const duration = summary.duration as number;
    const rawCoordinates = feature?.geometry?.coordinates;
    const routeGeometry = Array.isArray(rawCoordinates)
      ? rawCoordinates.flatMap((point) => Array.isArray(point) && typeof point[0] === "number" && typeof point[1] === "number" ? [{ lat: point[1], lng: point[0] }] : [])
      : [];
    if (routeGeometry.length < 2) return { state: "no-route" as const, destinationName: pandal.name, mapSearchUrl: pandal.mapSearchUrl };
    const instructions: RouteInstruction[] = (feature?.properties?.segments ?? []).flatMap(segment => segment.steps ?? []).flatMap(step => {
      const text = step.instruction?.trim();
      const wayPoints = Array.isArray(step.way_points) && step.way_points.length >= 2 && typeof step.way_points[0] === "number" && typeof step.way_points[1] === "number" ? step.way_points : null;
      return text ? [{ text, distanceMeters: typeof step.distance === "number" && Number.isFinite(step.distance) ? step.distance : null, fromIndex: wayPoints ? wayPoints[0] : null, toIndex: wayPoints ? wayPoints[1] : null }] : [];
    });
    return {
      state: "route-available" as const,
      destinationName: resolvedDestination.destinationName,
      distanceKm: Number((distance / 1000).toFixed(1)),
      durationMinutes: Math.max(1, Math.round(duration / 60)),
      mode: input.mode,
      provider: "openrouteservice by HeiGIT",
      trafficAware: false,
      calculatedAt: new Date().toISOString(),
      mapSearchUrl: pandal.mapSearchUrl,
      destination: resolvedDestination.destination,
      destinationConfidence: resolvedDestination.coordinateConfidence,
      coordinateSource: resolvedDestination.coordinateSource,
      coordinateVerificationMethod: resolvedDestination.coordinateVerificationMethod,
      routeGeometry,
      instructions,
    };
  } catch {
    return { state: "service-unavailable" as const, destinationName: pandal.name, mapSearchUrl: pandal.mapSearchUrl };
  }
}
