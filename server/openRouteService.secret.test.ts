import { describe, expect, it } from "vitest";
import { validateOpenRouteServiceKey } from "./services/openRouteService";

describe("openrouteservice credential", () => {
  it("accepts the configured server-side key through a lightweight walking-directions request", async () => {
    if (!process.env.OPENROUTESERVICE_API_KEY) return;
    const result = await validateOpenRouteServiceKey();
    expect(result.valid, `openrouteservice credential probe failed with status ${result.status}`).toBe(true);
  }, 20_000);
});
