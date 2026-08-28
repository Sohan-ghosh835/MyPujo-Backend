import { describe, expect, it } from "vitest";
import { findPandal, listPandals } from "./pandalCatalog";

describe("2026 starter data pack catalog", () => {
  it("exposes the supplied College Square record with its documented source-backed coordinate", () => {
    const collegeSquare = findPandal("pack-college-square-durga-puja");
    expect(collegeSquare).toMatchObject({
      name: "College Square Durga Puja",
      latitude: 22.57454884324772,
      longitude: 88.36447757007949,
      established: 1948,
      verifiedStatus: "Partially verified",
      coordinateSource: "Kolkata Durgotsav 2026 committee page direction link",
      coordinateConfidence: "high",
    });
    expect(collegeSquare?.sources[0]?.url).toContain("kolkatadurgotsav.com");
  });

  it("keeps only coordinate-backed starter records eligible for source-backed map markers", () => {
    const records = listPandals();
    const mappedStarterRecords = records.filter(record => record.id.startsWith("pack-") && record.latitude !== 0 && record.longitude !== 0);
    expect(mappedStarterRecords).toHaveLength(8);
    expect(mappedStarterRecords.map(record => record.name)).toContain("Naktala Udayan Sangha Durgotsav");
    expect(mappedStarterRecords.every(record => record.coordinateSource && record.coordinateRetrievedAt && record.coordinateConfidence)).toBe(true);
  });

  it("enriches naming variants with the supplied rank, practical visitor guide, and licensed image", () => {
    const collegeSquare = findPandal("pack-college-square-durga-puja");
    expect(collegeSquare).toMatchObject({
      userRank: 8,
      visitorContext: { lens: "Lightscape", historicAccess: "Guide access: Central Metro" },
      image: { author: "Tarunsamanta", license: "CC BY-SA 4.0", capturedYear: 2022 },
    });
    expect(listPandals().slice(0, 3).map(record => record.userRank)).toEqual([1, 2, 3]);
  });

  it("uses verified Creative Commons photographs for the newly visible heritage and club records", () => {
    expect(listPandals().find(record => record.name === "Ahiritola Sarbojanin Durgotsav")?.image).toMatchObject({ author: "Indrajit Das", license: "CC BY-SA 4.0", capturedYear: 2018 });
    expect(listPandals().find(record => record.name === "Sovabazar Rajbari")?.image).toMatchObject({ author: "Dassurojitsd", license: "CC BY-SA 4.0", capturedYear: 2015 });
    expect(listPandals().find(record => record.name === "Chetla Agrani Club")?.image).toMatchObject({ author: "Goutam1962", license: "CC BY-SA 4.0", capturedYear: 2025 });
    expect(listPandals().find(record => record.name === "Sreebhumi Sporting Club")?.image).toMatchObject({ author: "Biswarup Ganguly", license: "CC BY 3.0", capturedYear: 2014 });
    expect(listPandals().find(record => record.name === "Suruchi Sangha")?.image).toMatchObject({ author: "Biswarup Ganguly", license: "CC BY 3.0", capturedYear: 2015 });
    expect(listPandals().find(record => record.name === "Ballygunge Cultural Association")?.image).toMatchObject({ author: "Sumita Roy Dutta", license: "CC BY-SA 4.0", capturedYear: 2019 });
    expect(listPandals().find(record => record.name === "Maddox Square")?.image).toMatchObject({ author: "Jonoikobangali", license: "CC BY-SA 3.0", capturedYear: 2010 });
  });
});
