import { ALL_PANDALS, type PandalRecord, type Section } from "../../shared/pujaData";
import { normalizeSearchTerm } from "../../shared/catalogGovernance";

export type LocationStatus = "verified-coordinate" | "address-available" | "approximate-locality";

export type CatalogFilters = {
  query?: string;
  section?: Section | "All Kolkata";
  crowd?: string;
  tag?: string;
  verifiedOnly?: boolean;
  priority?: "S" | "A" | "B" | "C";
  hasImage?: boolean;
  locationStatus?: LocationStatus;
  source?: "kolkatakhoj";
  sourceZone?: "North" | "Central" | "South" | "Salt Lake";
  sourceFeatured?: boolean;
};

const norm = (value: string) => value.trim().toLocaleLowerCase();
const locationStatusFor = (pandal: PandalRecord): LocationStatus => {
  if (pandal.latitude !== 0 && pandal.longitude !== 0) return "verified-coordinate";
  if (pandal.addressDetails?.confidence === "full" || pandal.mapSearchUrl) return "address-available";
  return "approximate-locality";
};

export function listPandals(filters: CatalogFilters = {}) {
  const query = normalizeSearchTerm(filters.query ?? "");
  return ALL_PANDALS.filter(pandal => {
    const searchable = [pandal.name, pandal.canonicalName, ...(pandal.aliases ?? []), pandal.section, pandal.subArea, pandal.address, pandal.landmark, pandal.metro, pandal.addressDetails?.pincode, pandal.kolkataKhoj2026?.sourceZone, ...pandal.tags]
      .filter(Boolean)
      .map(value => normalizeSearchTerm(String(value)))
      .join(" ");
    return (
      (!query || searchable.includes(query)) &&
      (!filters.section || filters.section === "All Kolkata" || pandal.section === filters.section) &&
      (!filters.crowd || pandal.crowd === filters.crowd) &&
      (!filters.tag || pandal.tags.some(tag => norm(tag) === norm(filters.tag ?? ""))) &&
      (!filters.verifiedOnly || pandal.verifiedStatus === "Verified") &&
      (!filters.priority || pandal.suppliedPriority === filters.priority) &&
      (!filters.hasImage || Boolean(pandal.image)) &&
      (!filters.locationStatus || locationStatusFor(pandal) === filters.locationStatus) &&
      (!filters.source || (filters.source === "kolkatakhoj" && Boolean(pandal.kolkataKhoj2026))) &&
      (!filters.sourceZone || pandal.kolkataKhoj2026?.sourceZone === filters.sourceZone) &&
      (filters.sourceFeatured === undefined || pandal.kolkataKhoj2026?.sourceFeatured === filters.sourceFeatured)
    );
  }).sort((left, right) => (left.userRank ?? Number.MAX_SAFE_INTEGER) - (right.userRank ?? Number.MAX_SAFE_INTEGER) || left.name.localeCompare(right.name));
}

export { locationStatusFor };

export function findPandal(id: string): PandalRecord | undefined {
  return ALL_PANDALS.find(pandal => pandal.id === id);
}

export function sectionSummary(section: Section) {
  const pandals = listPandals({ section });
  return {
    section,
    pandalCount: pandals.length,
    famousCount: "Information unavailable",
    crowdSummary: "Current-season crowd information unavailable",
    isDevelopmentData: false,
  };
}
