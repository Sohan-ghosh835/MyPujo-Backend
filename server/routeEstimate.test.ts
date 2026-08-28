import { afterEach, describe, expect, it, vi } from "vitest";
import { estimateRouteToPandal } from "./services/routeEstimate";

const previousKey = process.env.OPENROUTESERVICE_API_KEY;
afterEach(() => { process.env.OPENROUTESERVICE_API_KEY = previousKey; vi.unstubAllGlobals(); });

describe("route estimates", () => {
  it("returns an address-only fallback without making a routing request for an unverified destination", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const result = await estimateRouteToPandal({ recordId: "sharodiya-11-pally-durga-deul", originLat: 22.57, originLng: 88.36, mode: "walking" });
    expect(result.state).toBe("destination-unverified");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns a provider-backed non-live estimate only for a verified coordinate", async () => {
    process.env.OPENROUTESERVICE_API_KEY = "test-key";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ features: [{ properties: { summary: { distance: 1450, duration: 1080 } }, geometry: { coordinates: [[88.36, 22.57], [88.365, 22.572]] } }] }) }));
    const result = await estimateRouteToPandal({ recordId: "pack-college-square-durga-puja", originLat: 22.57, originLng: 88.36, mode: "walking" });
    expect(result).toMatchObject({ state: "route-available", distanceKm: 1.4, durationMinutes: 18, mode: "walking", trafficAware: false, provider: "openrouteservice by HeiGIT", destination: { lat: expect.any(Number), lng: expect.any(Number) }, routeGeometry: expect.arrayContaining([{ lat: 22.57, lng: 88.36 }]) });
  });
});
