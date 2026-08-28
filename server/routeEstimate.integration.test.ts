import { describe, expect, it } from "vitest";
import { estimateRouteToPandal } from "./services/routeEstimate";

describe("openrouteservice route integration", () => {
  it("returns a provider-backed estimated route for a verified College Square coordinate without claiming traffic live data", async () => {
    if (!process.env.OPENROUTESERVICE_API_KEY) return;
    const result = await estimateRouteToPandal({ recordId: "pack-college-square-durga-puja", originLat: 22.5726, originLng: 88.3639, mode: "walking" });
    expect(result.state).toBe("route-available");
    if (result.state === "route-available") {
      expect(result.distanceKm).toBeGreaterThan(0);
      expect(result.durationMinutes).toBeGreaterThan(0);
      expect(result.trafficAware).toBe(false);
      expect(result.provider).toBe("openrouteservice by HeiGIT");
    }
  }, 20_000);
});
