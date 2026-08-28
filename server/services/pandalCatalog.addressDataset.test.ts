import { describe, expect, it } from "vitest";
import { findPandal, listPandals } from "./pandalCatalog";

describe("user address dataset catalog", () => {
  it("includes the supplied Bagbazar address with its user priority and a map-search hand-off, not a fabricated coordinate", () => {
    const bagbazar = findPandal("address-bagbazar-sarbojanin-700003");
    expect(bagbazar).toMatchObject({
      name: "Bagbazar Sarbojanin",
      address: "7, Bagbazar Street, Baghbazar, Kolkata",
      priority: "S",
      latitude: 0,
      longitude: 0,
      verifiedStatus: "Unverified",
    });
    expect(bagbazar?.mapSearchUrl).toContain("google.com/maps/search");
  });

  it("keeps the catalog broad while retaining no-coordinate user rows out of validated map markers", () => {
    const records = listPandals();
    const addressRows = records.filter(record => record.addressSource === "User-supplied address dataset");
    expect(addressRows.length).toBeGreaterThan(250);
    expect(addressRows.every(record => record.latitude === 0 && record.longitude === 0)).toBe(true);
  });

  it("filters category-led discovery through explicit sourced guide lenses rather than inferred themes", () => {
    const heritage = listPandals({ tag: "Heritage" });
    expect(heritage.map(record => record.name)).toContain("Bagbazar Sarbojanin");
    expect(heritage.length).toBeGreaterThan(1);
    expect(heritage.every(record => record.visitorContext?.lens === "Heritage")).toBe(true);
  });

  it("supports neighbourhood-led discovery with records restricted to the requested catalog section", () => {
    const northKolkata = listPandals({ section: "North Kolkata" });
    expect(northKolkata.map(record => record.name)).toContain("Bagbazar Sarbojanin");
    expect(northKolkata.every(record => record.section === "North Kolkata")).toBe(true);
  });

  it("searches canonical aliases and pincode while keeping user-supplied priority explicit", () => {
    expect(listPandals({ query: "baghbazar" }).map(record => record.name)).toContain("Bagbazar Sarbojanin");
    expect(listPandals({ query: "700005" }).every(record => record.addressDetails?.pincode === "700005")).toBe(true);
    const suppliedS = listPandals({ priority: "S" });
    expect(suppliedS.length).toBeGreaterThan(10);
    expect(suppliedS.every(record => record.suppliedPriority === "S" && record.verifiedPriority === undefined)).toBe(true);
  });

  it("filters photo and location states without creating coordinates for address-only records", () => {
    const photos = listPandals({ hasImage: true });
    expect(photos.length).toBeGreaterThan(8);
    expect(photos.every(record => Boolean(record.image))).toBe(true);
    const coordinateRecords = listPandals({ locationStatus: "verified-coordinate" });
    expect(coordinateRecords.length).toBeGreaterThan(0);
    expect(coordinateRecords.every(record => record.latitude !== 0 && record.longitude !== 0)).toBe(true);
  });
});
