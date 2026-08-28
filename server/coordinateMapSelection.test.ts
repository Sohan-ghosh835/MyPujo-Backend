import { describe, expect, it } from "vitest";
import { coordinateMapTarget } from "../shared/coordinateMapSelection";

describe("coordinate map selection target", () => {
  it("keeps the center, zoom, and marker identity tied to the same selected candidate", () => {
    expect(coordinateMapTarget({ latitude: 22.5143921, longitude: 88.3371763, label: "chetla-agrani" })).toEqual({ center: [22.5143921, 88.3371763], zoom: 17, markerKey: "22.5143921:88.3371763:chetla-agrani" });
  });

  it("changes the center and marker identity for a different candidate rather than retaining the prior selection", () => {
    const first = coordinateMapTarget({ latitude: 22.5212474, longitude: 88.3679418, label: "ekdalia-evergreen" });
    const next = coordinateMapTarget({ latitude: 22.5143921, longitude: 88.3371763, label: "chetla-agrani" });
    expect(next.center).not.toEqual(first.center);
    expect(next.markerKey).not.toBe(first.markerKey);
  });
});
