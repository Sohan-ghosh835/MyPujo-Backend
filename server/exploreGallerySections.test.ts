import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const exploreSource = readFileSync(path.resolve(process.cwd(), "client/src/pages/Explore.tsx"), "utf8");

describe("Explore peer gallery sections", () => {
  it("keeps Pujo Gallery as its own selected view beside Photo Highlights", () => {
    expect(exploreSource).toContain('type ExploreView = "all" | "photo" | "gallery"');
    expect(exploreSource).toContain('setView("gallery")');
    expect(exploreSource).toContain('isGalleryView ? <PujoGallery bengali={bengali}/>');
    expect(exploreSource).not.toContain('isPhotoView && !pandals.isLoading && <><PujoGallery');
  });

  it("does not request committee records while the festival-context gallery is selected", () => {
    expect(exploreSource).toContain("enabled: !isGalleryView");
  });

  it("removes public Image Sources navigation while keeping Explore focused on functional gallery views", () => {
    const appSource = readFileSync(path.resolve(process.cwd(), "client/src/App.tsx"), "utf8");
    const detailSource = readFileSync(path.resolve(process.cwd(), "client/src/pages/PandalDetail.tsx"), "utf8");
    expect(appSource).not.toContain('path="/explore/images"');
    expect(exploreSource).not.toContain('href="/explore/images"');
    expect(detailSource).not.toContain('/explore/images?pandal=');
  });
});
