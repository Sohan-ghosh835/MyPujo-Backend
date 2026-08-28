import { describe, expect, it } from "vitest";
import { getRouteProgress, hasArrived, haversineMeters, offRouteThresholdMeters, routeLengthMeters } from "../shared/navigationMath";

describe("navigation math", () => {
  const route = [{ lat: 22.5700, lng: 88.3600 }, { lat: 22.5710, lng: 88.3600 }, { lat: 22.5720, lng: 88.3600 }];
  it("measures a city-scale route and projects GPS position onto its nearest segment", () => {
    expect(haversineMeters(route[0], route[2])).toBeGreaterThan(200);
    expect(routeLengthMeters(route)).toBeGreaterThan(200);
    const progress = getRouteProgress(route, { lat: 22.5710, lng: 88.36008 });
    expect(progress.progressPercent).toBeGreaterThan(40);
    expect(progress.progressPercent).toBeLessThan(60);
    expect(progress.distanceFromRouteMeters).toBeLessThan(12);
  });
  it("uses accuracy-aware but bounded thresholds for arrival and off-route decisions", () => {
    expect(hasArrived({ lat: 22.5710, lng: 88.3600 }, { lat: 22.5713, lng: 88.3600 }, 15)).toBe(true);
    expect(hasArrived({ lat: 22.5710, lng: 88.3600 }, { lat: 22.5722, lng: 88.3600 }, 200)).toBe(false);
    expect(offRouteThresholdMeters(1)).toBe(55);
    expect(offRouteThresholdMeters(100)).toBe(150);
  });
});
