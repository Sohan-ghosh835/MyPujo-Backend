import { describe, expect, it } from "vitest";
import { normalizePujaName } from "@shared/catalogGovernance";
import { ALL_PANDALS } from "@shared/pujaData";

describe("catalogue governance", () => {
  it("gives every public record a canonical identifier, address state, and typed provenance", () => {
    expect(ALL_PANDALS.every(record => Boolean(record.canonicalId && record.canonicalName && record.addressDetails && record.sourceMetadata?.length))).toBe(true);
    expect(ALL_PANDALS.every(record => record.canonicalId === record.id)).toBe(true);
  });

  it("merges name variants without discarding a useful user-supplied address or rank", () => {
    const kumartuli = ALL_PANDALS.find(record => normalizePujaName(record.name) === "kumartuli park");
    expect(kumartuli?.address).toContain("Abhay Mitra Street");
    expect(kumartuli?.aliases).toContain("Kumartuli Park Sarbojanin");
    expect(kumartuli?.userSuppliedRank).toBe(2);
    expect(kumartuli?.suppliedPriority).toBe("S");
    expect(kumartuli?.verifiedPriority).toBeUndefined();
  });

  it("does not leave duplicate normalized committee identities after canonical merging", () => {
    const names = ALL_PANDALS.map(record => normalizePujaName(record.name));
    expect(new Set(names).size).toBe(names.length);
  });

  it("retains the independently checked Aikatan discovery lead with typed Sharodiya and committee provenance", () => {
    const aikatan = ALL_PANDALS.find(record => record.id === "address-dakshin-kolkata-sarbojanin-aikatan-south-kolkata");
    expect(aikatan?.aliases).toContain("Aikatan, Dakshin Kolkata Sarbajanin Durgapujo");
    expect(aikatan?.address).toContain("Priyanath Mallick Road");
    expect(aikatan?.sourceMetadata).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: "discovery source", url: "https://sharodiya.com/pandals", retrievedAt: "2026-08-23" }),
      expect.objectContaining({ type: "official committee", url: "https://www.facebook.com/dakshinkalikatasarbojanin/", retrievedAt: "2026-08-23" }),
    ]));
    expect(aikatan?.latitude).toBe(0);
    expect(aikatan?.longitude).toBe(0);
    expect(ALL_PANDALS.filter(record => record.name.toLowerCase().includes("aikatan"))).toHaveLength(1);
  });

  it("keeps the Salt Lake route discoveries address-only, provenance-labelled, and outside the supplied ranking", () => {
    const discovered = ALL_PANDALS.filter(record => ["ae-part-2-durga-puja", "karunamoyee-housing-estate-g-block-durga-puja"].includes(record.id));
    expect(discovered).toHaveLength(2);
    expect(discovered.every(record => record.latitude === 0 && record.longitude === 0 && record.userSuppliedRank === undefined && record.suppliedPriority === undefined)).toBe(true);
    expect(discovered.every(record => record.sourceMetadata?.some(source => source.type === "discovery source" && source.url === "https://sharodiya.com/pandal-hopping-routes"))).toBe(true);
  });
});
