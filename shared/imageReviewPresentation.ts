export type ImageReviewPresentationInput = {
  status: string;
  managedAssetUrl: string | null;
  visualMatchConfidence: number | null;
};

export function imageReviewPresentation(input: ImageReviewPresentationInput) {
  if (input.status === "approved" && input.managedAssetUrl && (input.visualMatchConfidence ?? 0) >= 90) {
    return { tone: "approved" as const, title: "Automatically approved and attached", detail: "The source, reusable licence, attribution, exact identity evidence, technical checks, visual evidence, and managed asset gate have already passed. No owner action is required." };
  }
  if (input.status === "approved") {
    return { tone: "approved" as const, title: "Approval evidence retained", detail: "This candidate has passed review evidence and awaits only the automatic managed-asset attachment step. No licence or attribution entry is required from you." };
  }
  if (input.status === "review_required") {
    return { tone: "review" as const, title: "Automatically retained outside public use", detail: "The recorded source evidence does not establish every required identity or visual proof. It remains excluded from the public catalogue rather than being approved on consent alone." };
  }
  if (input.status === "rejected") {
    return { tone: "rejected" as const, title: "Automatically rejected", detail: "The evidence found a mismatch or insufficient basis for safe catalogue use. This candidate remains excluded from public imagery." };
  }
  return { tone: "neutral" as const, title: "Automatic evidence outcome retained", detail: "The durable source and review evidence determine this candidate’s state; no manual licence or attribution entry is required." };
}
