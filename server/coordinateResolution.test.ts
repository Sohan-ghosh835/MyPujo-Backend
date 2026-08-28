import { describe, expect, it } from "vitest";
import { coordinateQueries, getNavigationDestination, scoreCandidate } from "./services/coordinateResolution";

describe("coordinate resolution safeguards", () => {
  it("forms bounded catalogue queries without using a locality centre as a destination", () => {
    const queries = coordinateQueries("Example Sarbojanin", "17 Example Road, Ballygunge", "South Kolkata");
    expect(queries[0]).toContain("Example Sarbojanin");
    expect(queries[0]).toContain("17 Example Road");
    expect(queries.every(query => query.includes("India"))).toBe(true);
  });

  it("scores a road-only geocoding response low rather than promoting it to a verified destination", () => {
    expect(scoreCandidate({ display_name: "Ekdalia Road, Ballygunge, Kolkata" }, "Ekdalia Evergreen Club")).toBe("low");
  });

  it("requires both strong pandal identity and address evidence before classifying an address-resolved location high", () => {
    expect(scoreCandidate({ display_name: "Ekdalia Evergreen Club, 11 Ekdalia Road, Kolkata, West Bengal, 700019, India", address: { city: "Kolkata", postcode: "700019" } }, "Ekdalia Evergreen Club", "11 Ekdalia Road, Ballygunge, Kolkata 700019")).toBe("high");
  });

  it("keeps an address-only record out of navigation until a review has approved a candidate", async () => {
    const destination = await getNavigationDestination("sharodiya-11-pally-durga-deul");
    expect(destination).toBeUndefined();
  });

  it("preserves a pre-existing high-confidence destination for routing", async () => {
    const destination = await getNavigationDestination("pack-college-square-durga-puja");
    expect(destination).toMatchObject({ coordinateConfidence: "high", destination: { lat: expect.any(Number), lng: expect.any(Number) } });
  });
});
