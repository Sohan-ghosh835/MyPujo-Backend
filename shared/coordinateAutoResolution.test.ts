import { describe, expect, it } from "vitest";
import { scoreAutomaticCoordinate } from "./coordinateAutoResolution";

const base = { name: "Ekdalia Evergreen Club", aliases: ["Ekdalia Evergreen"], address: "15, Ekdalia Road, Ballygunge, Kolkata", subArea: "Ballygunge", pincode: "700042", evidence: { id: "1", type: "node" as const, latitude: 22.52, longitude: 88.36, tags: { name: "Durga Puja Pandal - Ekdalia Evergreen", "addr:street": "Ekdalia Road", "addr:suburb": "Ballygunge", "addr:postcode": "700042", "addr:city": "Kolkata" } } };

describe("automatic coordinate evidence scoring", () => {
  it("verifies an exact committee and full structured address match", () => expect(scoreAutomaticCoordinate(base).outcome).toBe("approved"));
  it("resolves a name, street, and Kolkata match without pincode data", () => expect(scoreAutomaticCoordinate({ ...base, evidence: { ...base.evidence, tags: { name: "Durga Puja Pandal - Ekdalia Evergreen", "addr:street": "Ekdalia Road", "addr:city": "Kolkata" } } }).outcome).toBe("resolved"));
  it("retains a name-only result for review instead of fabricating address evidence", () => expect(scoreAutomaticCoordinate({ ...base, evidence: { ...base.evidence, tags: { name: "Durga Puja Pandal - Ekdalia Evergreen", "addr:city": "Kolkata" } } }).outcome).toBe("review_required"));
  it("does not attach an unrelated OSM place to the canonical record", () => expect(scoreAutomaticCoordinate({ ...base, evidence: { ...base.evidence, tags: { name: "Different Committee", "addr:city": "Kolkata" } } }).outcome).toBe("unresolved"));
});
