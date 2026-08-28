import type { PandalRecord } from "./pujaData";

const unavailable = (value: string | undefined) => !value || value === "Information unavailable";

/** Data-gap measure only. It must never be used for ranking, popularity, or recommendation. */
export function getDataCompleteness(record: PandalRecord) {
  const total = (unavailable(record.address) ? 0 : 20)
    + (record.latitude !== 0 && record.longitude !== 0 && record.coordinateConfidence === "high" ? 20 : 0)
    + (record.sources.length > 0 ? 15 : 0)
    + (record.image ? 15 : 0)
    + (unavailable(record.metro) ? 0 : 10)
    + (record.visitorContext || record.established ? 10 : 0)
    + (record.season2026Status === "verified" ? 10 : 0);
  return total;
}

/** Evidence-count indicator, kept explicitly separate from completeness and user-supplied priority. */
export function getVerificationLevel(record: PandalRecord) {
  if (record.verifiedStatus === "Verified" && record.sources.length >= 2) return 3;
  if (record.sources.length >= 2 || record.verifiedStatus === "Partially verified") return 2;
  if (record.sources.length === 1) return 1;
  return 0;
}
