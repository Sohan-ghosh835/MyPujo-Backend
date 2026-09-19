/**
 * Broader nearest-ranking functions for the "Find what's near me" panel.
 *
 * Unlike findNearbyPandals (shared/proximity.ts) which is capped at 100m
 * for GPS check-in matching, these functions work at city scale (default 5km)
 * and return sorted results for discovery and navigation.
 *
 * Kept separate from proximity.ts because the use cases are different:
 * proximity.ts is for confirming "I am physically at this pandal" (tight radius),
 * nearestDiscovery.ts is for "show me what's around me" (wide radius, ranked).
 */

import { haversineMeters, type GeoPoint } from "./navigationMath";
import type { PandalRecord } from "./pujaData";
import type { MetroStation } from "./metroStations";
import type { PublicToilet } from "./publicToilets";

// ── Types ──

export type NearbyPandalResult = {
  pandal: PandalRecord;
  distanceMeters: number;
};

export type NearbyMetroResult = {
  station: MetroStation;
  distanceMeters: number;
};

export type NearbyToiletResult = {
  toilet: PublicToilet;
  distanceMeters: number;
};

export type TopPickResult = NearbyPandalResult & {
  /** Blended score: lower is better. Combines distance with priority/featured bonus. */
  score: number;
};

// ── Priority weights for blended scoring ──

const PRIORITY_WEIGHT: Record<string, number> = {
  S: 0.5,   // Strong distance discount — iconic pandals surface even if a bit farther
  A: 0.7,
  B: 0.9,
  C: 1.0,
};

// ── Pandal nearest functions ──

/**
 * Returns all pandals within radius, sorted by haversine distance ascending.
 * Only includes pandals with valid (non-zero) coordinates.
 */
export function findNearestPandals(
  pandals: PandalRecord[],
  position: GeoPoint,
  options: { radiusMeters?: number } = {},
): NearbyPandalResult[] {
  const radiusMeters = options.radiusMeters ?? 5000;
  return pandals
    .filter((p) =>
      p.latitude !== 0 && p.longitude !== 0 &&
      Number.isFinite(p.latitude) && Number.isFinite(p.longitude)
    )
    .map((pandal) => ({
      pandal,
      distanceMeters: haversineMeters(position, { lat: pandal.latitude, lng: pandal.longitude }),
    }))
    .filter((r) => r.distanceMeters <= radiusMeters)
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}

/**
 * "Top picks" — blends distance with priority and sourceFeatured status
 * so genuinely notable pandals that are merely "nearby" still surface,
 * not just the closest ones.
 *
 * Returns the top N results (default 5) by blended score.
 */
export function findTopPicks(
  pandals: PandalRecord[],
  position: GeoPoint,
  options: { radiusMeters?: number; limit?: number } = {},
): TopPickResult[] {
  const radiusMeters = options.radiusMeters ?? 5000;
  const limit = options.limit ?? 5;

  return pandals
    .filter((p) =>
      p.latitude !== 0 && p.longitude !== 0 &&
      Number.isFinite(p.latitude) && Number.isFinite(p.longitude)
    )
    .map((pandal) => {
      const distanceMeters = haversineMeters(position, { lat: pandal.latitude, lng: pandal.longitude });
      const priorityMultiplier = PRIORITY_WEIGHT[pandal.priority ?? "C"] ?? 1.0;
      const featuredBonus = pandal.kolkataKhoj2026?.sourceFeatured ? 0.8 : 1.0;
      // Score: distance × priority multiplier × featured bonus
      // Lower score = higher recommendation
      const score = distanceMeters * priorityMultiplier * featuredBonus;
      return { pandal, distanceMeters, score };
    })
    .filter((r) => r.distanceMeters <= radiusMeters)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit);
}

// ── Metro station nearest ──

export function findNearestMetroStations(
  stations: MetroStation[],
  position: GeoPoint,
  limit: number = 3,
): NearbyMetroResult[] {
  return stations
    .map((station) => ({
      station,
      distanceMeters: haversineMeters(position, { lat: station.lat, lng: station.lng }),
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, limit);
}

// ── Public toilet nearest ──

export function findNearestToilets(
  toilets: PublicToilet[],
  position: GeoPoint,
  limit: number = 3,
): NearbyToiletResult[] {
  return toilets
    .map((toilet) => ({
      toilet,
      distanceMeters: haversineMeters(position, { lat: toilet.lat, lng: toilet.lng }),
    }))
    .sort((a, b) => a.distanceMeters - b.distanceMeters)
    .slice(0, limit);
}
