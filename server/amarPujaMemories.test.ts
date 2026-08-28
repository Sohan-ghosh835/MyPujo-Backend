import { beforeEach, describe, expect, it, vi } from "vitest";
import { indexedDB } from "fake-indexeddb";
import { addAmarPujaPhoto, createAmarPujaVisit, deleteAmarPujaPhoto, deleteAmarPujaVisit, getAmarPujaVisits, hasPrivateMemoryStorage } from "../client/src/lib/amarPujaMemories";

describe("private Amar Pujo memory storage", () => {
  beforeEach(() => {
    vi.stubGlobal("indexedDB", indexedDB);
    vi.stubGlobal("window", { indexedDB });
  });

  it("persists a visit and photo locally, then supports private photo and visit deletion", async () => {
    expect(hasPrivateMemoryStorage()).toBe(true);
    const visit = await createAmarPujaVisit({ pandalId: "college-square", pandalName: "College Square Durga Puja", subArea: "Central Kolkata", detectionMethod: "manual_selection" });
    const photo = await addAmarPujaPhoto({ visitId: visit.id, blob: new Blob(["private-photo"], { type: "image/jpeg" }) });
    let memories = await getAmarPujaVisits();
    expect(memories).toHaveLength(1);
    expect(memories[0]).toMatchObject({ id: visit.id, pandalId: "college-square", detectionMethod: "manual_selection" });
    expect(memories[0].photos).toHaveLength(1);
    await deleteAmarPujaPhoto(photo.id);
    memories = await getAmarPujaVisits();
    expect(memories[0].photos).toEqual([]);
    await deleteAmarPujaVisit(visit.id);
    expect(await getAmarPujaVisits()).toEqual([]);
  });

  it("retains a navigation-arrival destination and its captured photo without any location trail", async () => {
    const visit = await createAmarPujaVisit({ pandalId: "bagbazar-sarbojanin", pandalName: "Bagbazar Sarbojanin", subArea: "North Kolkata", detectionMethod: "navigation_arrival" });
    await addAmarPujaPhoto({ visitId: visit.id, blob: new Blob(["arrival-camera-photo"], { type: "image/jpeg" }) });

    const [memory] = await getAmarPujaVisits();
    expect(memory).toMatchObject({ pandalId: "bagbazar-sarbojanin", pandalName: "Bagbazar Sarbojanin", detectionMethod: "navigation_arrival" });
    expect(memory?.photos).toHaveLength(1);
    expect(memory).not.toHaveProperty("latitude");
    expect(memory).not.toHaveProperty("longitude");
  });
});
