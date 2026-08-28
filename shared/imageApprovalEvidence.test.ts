import { describe, expect, it } from "vitest";
import { decideImageApproval, hasExactFilenameIdentity } from "./imageApprovalEvidence";

const visual = { content: "pandal" as const, committeeNameVisible: false, visibleText: "", visualQuality: "usable" as const, visualConfidence: 88, contradiction: false, rationale: "A usable decorated pandal view is visible." };
const base = { sourcePageReachable: true, reusableLicense: true, attributionComplete: true, technicalQualityScore: 85, contentType: "image/jpeg", width: 2000, height: 1400, matchConfidence: 99, exactTextualIdentity: true, alreadyPublicSource: false, visual };

describe("image approval evidence gates", () => {
  it("approves only when every rights, identity, technical, and visual gate passes", () => expect(decideImageApproval(base).decision).toBe("approved"));
  it("keeps a filename-only match in review", () => expect(decideImageApproval({ ...base, visual: null }).decision).toBe("review_required"));
  it("rejects a visually contradictory crowd-only result", () => expect(decideImageApproval({ ...base, visual: { ...visual, content: "crowd_or_street" } }).decision).toBe("rejected"));
  it("recognizes a multi-token exact title rather than a loose generic committee term", () => {
    expect(hasExactFilenameIdentity("Ekdalia Evergreen Club", [], "Durga Puja Pandal - Ekdalia Evergreen - Kolkata 2011.jpg")).toBe(true);
    expect(hasExactFilenameIdentity("Bagbazar Sarbojanin", [], "Kolkata Bagbazar Pandal 2006.jpg")).toBe(false);
  });
});
