import { describe, expect, it } from "vitest";
import { MAHALAYA_2026, getMahalayaCountdown } from "@shared/pujaCalendar";

describe("2026 Mahalaya countdown", () => {
  it("reports complete days, hours, and minutes before the cultural countdown marker", () => {
    expect(getMahalayaCountdown(MAHALAYA_2026 - (2 * 86_400_000) - (3 * 3_600_000) - (4 * 60_000))).toEqual({ days: 2, hours: 3, minutes: 4 });
  });

  it("does not produce a negative countdown after the marker", () => {
    expect(getMahalayaCountdown(MAHALAYA_2026 + 60_000)).toEqual({ days: 0, hours: 0, minutes: 0 });
  });
});
