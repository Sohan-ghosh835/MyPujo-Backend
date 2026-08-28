import { describe, expect, it } from "vitest";
import { coordinateStatusLabel, evaluateCoordinateEvidence } from "./coordinateVerification";

const base = { canonicalName: "Ahiritola Sarbojanin Durgotsav", aliases: ["Ahiritola Sarbojanin"], canonicalAddress: "55, B. K. Pal Avenue Road, Ahiritola, Kolkata-700003", locality: "North Kolkata", section: "North Kolkata", landmark: "Near Ahiritola Ghat", pincode: "700003", query: "Ahiritola Sarbojanin Durgotsav, North Kolkata, Kolkata, India", displayName: "Ahiritola Sarbojanin Durgotsav, BK Pal Avenue, Jorasanko North, Kolkata, West Bengal, 700003, India", osmType: "node", latitude: 22.5945888, longitude: 88.3570461 };

describe("coordinate verification evidence", () => {
  it("verifies an exact named-place address result", () => expect(evaluateCoordinateEvidence(base).decision).toBe("approved"));
  it("requires review when canonical and source pincodes conflict", () => expect(evaluateCoordinateEvidence({ ...base, pincode: "700006" }).decision).toBe("review_required"));
  it("requires review for a road-only result without the pandal identity", () => expect(evaluateCoordinateEvidence({ ...base, canonicalName: "Ekdalia Evergreen Club", aliases: [], pincode: null, query: "15 Ekdalia Road Ballygunge Kolkata", displayName: "Ekdalia Road, Ballygunge, Kolkata, 700042, India", osmType: "way" }).decision).toBe("review_required"));
  it("rejects coordinates outside the Kolkata verification boundary", () => expect(evaluateCoordinateEvidence({ ...base, latitude: 23.1 }).decision).toBe("rejected"));
  it("maps stored lifecycle statuses to user-facing decision labels", () => expect(coordinateStatusLabel("approved")).toBe("VERIFIED"));
});
