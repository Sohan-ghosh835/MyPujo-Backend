import { describe, expect, it } from "vitest";
import { KOLKATAKHOJ_2026_DAY_FACTS, KOLKATAKHOJ_MAHALAYA_SOURCE_CONFLICT, KOLKATAKHOJ_2026_SOURCE } from "../shared/kolkataKhoj2026";

describe("KolkataKhoj 2026 source boundary", () => {
  it("retains concise day facts with a public source and no fabricated timings", () => {
    expect(KOLKATAKHOJ_2026_DAY_FACTS.map(day => day.date)).toEqual(["2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20", "2026-10-21"]);
    expect(KOLKATAKHOJ_2026_DAY_FACTS.flatMap(day => day.rituals)).toContain("Sandhi Puja");
    expect(KOLKATAKHOJ_2026_SOURCE.url).toBe("https://kolkatakhoj.com/durga-puja-2026/");
  });

  it("keeps the conflicting Mahalaya claim outside the displayed verified calendar", () => {
    expect(KOLKATAKHOJ_MAHALAYA_SOURCE_CONFLICT.status).toBe("source_conflict");
    expect(KOLKATAKHOJ_MAHALAYA_SOURCE_CONFLICT.sourceReportedDate).not.toBe(KOLKATAKHOJ_MAHALAYA_SOURCE_CONFLICT.independentlySupportedDate);
  });
});
