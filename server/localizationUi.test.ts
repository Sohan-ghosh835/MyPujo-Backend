import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const project = resolve(import.meta.dirname, "..");
const source = (path: string) => readFileSync(resolve(project, path), "utf8");

describe("public bilingual UI contracts", () => {
  it("supports deterministic English and Bengali preview overrides without replacing the persistent toggle", () => {
    const context = source("client/src/contexts/LanguageContext.tsx");
    expect(context).toContain('get("lang")');
    expect(context).toContain('queryLanguage === "bn" || queryLanguage === "en"');
    expect(context).toContain('localStorage.getItem("pujoparikroma-language")');
  });

  it("retains localized loading, empty, and unavailable-record states in public discovery flows", () => {
    const explore = source("client/src/pages/Explore.tsx");
    const detail = source("client/src/pages/PandalDetail.tsx");
    expect(explore).toContain("pandals.isLoading");
    expect(explore).toContain("কোনও প্যান্ডেল পাওয়া যায়নি");
    expect(detail).toContain("detail.isLoading");
    expect(detail).toContain("প্যান্ডেল পাওয়া যায়নি");
  });
});
