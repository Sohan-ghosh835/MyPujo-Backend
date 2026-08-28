import { haversineMeters, type GeoPoint } from "./navigationMath";

export type CoordinateBackedPandal = { id: string; name: string; subArea: string; latitude?: number | null; longitude?: number | null; coordinateConfidence?: string };
export type NearbyPandal = CoordinateBackedPandal & { distanceMeters: number; confidenceNote: "within-radius" | "near-radius" };

/** Returns only source-verified, high-confidence locations. It never creates a visit by itself. */
export function findNearbyPandals(records: CoordinateBackedPandal[], position: GeoPoint, options: { radiusMeters?: number; accuracyMeters?: number } = {}): NearbyPandal[] {
  const radiusMeters = options.radiusMeters ?? 100;
  const accuracyMeters = Math.max(0, options.accuracyMeters ?? 0);
  return records.flatMap(record => {
    if (record.coordinateConfidence !== "high" || !Number.isFinite(record.latitude) || !Number.isFinite(record.longitude) || record.latitude === 0 || record.longitude === 0) return [];
    const distanceMeters = haversineMeters(position, { lat: record.latitude!, lng: record.longitude! });
    if (distanceMeters > radiusMeters) return [];
    return [{ ...record, distanceMeters, confidenceNote: distanceMeters + Math.min(accuracyMeters, radiusMeters) > radiusMeters ? "near-radius" as const : "within-radius" as const }];
  }).sort((a, b) => a.distanceMeters - b.distanceMeters);
}
