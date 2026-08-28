import { describe, expect, it } from "vitest";
import { decodePortableRoute, encodePortableRoute } from "../shared/portableRoute";

describe("portable route codec", () => {
  it("round-trips a route payload for a portable guest-share URL", () => {
    const route = { stops: [{ order: 1, pandal: { id: "dev-south-01", name: "South Arts Collective" } }], dataStatus: "development" };
    expect(decodePortableRoute<typeof route>(encodePortableRoute(route))).toEqual(route);
  });

  it("rejects malformed shared-route payloads without throwing", () => {
    expect(decodePortableRoute("not a valid payload")).toBeNull();
  });
});
