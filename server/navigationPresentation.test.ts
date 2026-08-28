import { describe, expect, it } from "vitest";
import { formatEstimatedMinutes, formatNavigationDistance, nextProviderInstruction } from "../shared/navigationPresentation";

describe("navigation presentation", () => {
  it("formats local route distance and estimated duration without excess precision", () => {
    expect(formatNavigationDistance(850)).toBe("850 m");
    expect(formatNavigationDistance(1_249)).toBe("1.2 km");
    expect(formatEstimatedMinutes(13.6)).toBe("~14 min");
    expect(formatNavigationDistance(null)).toBe("—");
  });

  it("advances only through provider-returned step text", () => {
    const instructions = [
      { text: "Depart on Example Road", distanceMeters: 120, fromIndex: 0, toIndex: 3 },
      { text: "Turn left onto College Street", distanceMeters: 180, fromIndex: 3, toIndex: 8 },
    ];
    expect(nextProviderInstruction(instructions, 4)?.text).toBe("Turn left onto College Street");
    expect(nextProviderInstruction([], 4)).toBeNull();
  });
});
