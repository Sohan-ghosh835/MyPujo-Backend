import { findPandal } from "./pandalCatalog";
import { getNavigationDestination } from "./coordinateResolution";
import type { RouteInstruction } from "../../shared/navigationPresentation";
import { haversineDistanceMeters } from "../../shared/navigationMath";

export type RouteMode = "walking" | "driving";
const profileByMode: Record<RouteMode, string> = { walking: "foot-walking", driving: "driving-car" };

function buildGeodesicFallbackRoute(originLat: number, originLng: number, destLat: number, destLng: number, mode: RouteMode) {
  const distanceMeters = haversineDistanceMeters({ lat: originLat, lng: originLng }, { lat: destLat, lng: destLng });
  const distanceKm = Number((distanceMeters / 1000).toFixed(1));
  const speedKmh = mode === "driving" ? 25 : 5;
  const durationMinutes = Math.max(1, Math.round((distanceKm / speedKmh) * 60));

  const steps = 15;
  const routeGeometry = Array.from({ length: steps + 1 }, (_, i) => {
    const fraction = i / steps;
    return {
      lat: Number((originLat + (destLat - originLat) * fraction).toFixed(6)),
      lng: Number((originLng + (destLng - originLng) * fraction).toFixed(6)),
    };
  });

  const instructions: RouteInstruction[] = [
    { text: `Proceed toward destination (${mode === "driving" ? "Drive" : "Walk"})`, distanceMeters, fromIndex: 0, toIndex: steps },
  ];

  return {
    distanceKm,
    durationMinutes,
    routeGeometry,
    instructions,
    provider: "PujoParikroma Geodesic Engine",
  };
}

export async function estimateRouteToPandal(input: { recordId: string; originLat: number; originLng: number; mode: RouteMode; allowCandidate?: boolean }) {
  const pandal = findPandal(input.recordId);
  if (!pandal) return { state: "destination-unavailable" as const };
  const resolvedDestination = await getNavigationDestination(input.recordId, { allowCandidate: input.allowCandidate });
  if (!resolvedDestination) {
    return { state: "destination-unverified" as const, destinationName: pandal.name, address: pandal.address, mapSearchUrl: pandal.mapSearchUrl };
  }

  // 1. Try OpenRouteService if API key is present
  const key = process.env.OPENROUTESERVICE_API_KEY;
  if (key) {
    try {
      const endpoint = `https://api.openrouteservice.org/v2/directions/${profileByMode[input.mode]}?start=${input.originLng},${input.originLat}&end=${resolvedDestination.destination.lng},${resolvedDestination.destination.lat}&instructions=true`;
      const response = await fetch(endpoint, { headers: { Authorization: key }, signal: AbortSignal.timeout(6_000) });
      if (response.ok) {
        const payload = await response.json() as { features?: Array<{ properties?: { summary?: { distance?: number; duration?: number }; segments?: Array<{ steps?: Array<{ instruction?: string; distance?: number; way_points?: unknown }> }> }; geometry?: { coordinates?: unknown } }> };
        const feature = payload.features?.[0];
        const summary = feature?.properties?.summary;
        if (summary && Number.isFinite(summary.distance) && Number.isFinite(summary.duration)) {
          const distance = summary.distance as number;
          const duration = summary.duration as number;
          const rawCoordinates = feature?.geometry?.coordinates;
          const routeGeometry = Array.isArray(rawCoordinates)
            ? rawCoordinates.flatMap((point) => Array.isArray(point) && typeof point[0] === "number" && typeof point[1] === "number" ? [{ lat: point[1], lng: point[0] }] : [])
            : [];
          if (routeGeometry.length >= 2) {
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
          }
        }
      }
    } catch {
      // Fall through to OSRM
    }
  }

  // 2. Try Public OSRM API (No API key needed)
  try {
    const osrmProfile = input.mode === "driving" ? "driving" : "foot";
    const osrmUrl = `https://router.project-osrm.org/route/v1/${osrmProfile}/${input.originLng},${input.originLat};${resolvedDestination.destination.lng},${resolvedDestination.destination.lat}?overview=full&geometries=geojson&steps=true`;
    const osrmRes = await fetch(osrmUrl, { signal: AbortSignal.timeout(6_000) });
    if (osrmRes.ok) {
      const osrmData = await osrmRes.json() as { routes?: Array<{ distance?: number; duration?: number; geometry?: { coordinates?: unknown }; legs?: Array<{ steps?: Array<{ name?: string; distance?: number }> }> }> };
      const osrmRoute = osrmData.routes?.[0];
      if (osrmRoute && typeof osrmRoute.distance === "number" && typeof osrmRoute.duration === "number") {
        const rawCoords = osrmRoute.geometry?.coordinates;
        const routeGeometry = Array.isArray(rawCoords)
          ? rawCoords.flatMap(p => Array.isArray(p) && typeof p[0] === "number" && typeof p[1] === "number" ? [{ lat: p[1], lng: p[0] }] : [])
          : [];
        if (routeGeometry.length >= 2) {
          const instructions: RouteInstruction[] = (osrmRoute.legs ?? []).flatMap(leg => leg.steps ?? []).map(step => ({
            text: step.name ? `Head via ${step.name}` : `Follow path`,
            distanceMeters: typeof step.distance === "number" ? step.distance : null,
            fromIndex: null,
            toIndex: null,
          }));
          return {
            state: "route-available" as const,
            destinationName: resolvedDestination.destinationName,
            distanceKm: Number((osrmRoute.distance / 1000).toFixed(1)),
            durationMinutes: Math.max(1, Math.round(osrmRoute.duration / 60)),
            mode: input.mode,
            provider: "OSRM OpenStreetMap",
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
        }
      }
    }
  } catch {
    // Fall through to Geodesic Engine
  }

  // 3. Fallback: Geodesic Engine (Always succeeds, zero downtime)
  const fallback = buildGeodesicFallbackRoute(input.originLat, input.originLng, resolvedDestination.destination.lat, resolvedDestination.destination.lng, input.mode);
  return {
    state: "route-available" as const,
    destinationName: resolvedDestination.destinationName,
    distanceKm: fallback.distanceKm,
    durationMinutes: fallback.durationMinutes,
    mode: input.mode,
    provider: fallback.provider,
    trafficAware: false,
    calculatedAt: new Date().toISOString(),
    mapSearchUrl: pandal.mapSearchUrl,
    destination: resolvedDestination.destination,
    destinationConfidence: resolvedDestination.coordinateConfidence,
    coordinateSource: resolvedDestination.coordinateSource,
    coordinateVerificationMethod: resolvedDestination.coordinateVerificationMethod,
    routeGeometry: fallback.routeGeometry,
    instructions: fallback.instructions,
  };
}
