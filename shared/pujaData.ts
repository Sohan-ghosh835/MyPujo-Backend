import { GENERATED_2026_PANDALS } from "./generatedPandalPack";
import { ADDRESS_DATASET_PANDALS } from "./generatedAddressCatalog";
import { USER_RANKS_BY_NORMALIZED_NAME } from "./generatedRankedPriorities";
import { getVisitorContext, type VisitorContext } from "./visitorContext";
import { classifySource, deriveAddressDetails, normalizePujaName, type AddressDetails, type SourceMetadata } from "./catalogGovernance";
import { SHARODIYA_IMPORTED_PANDALS, SHARODIYA_MATCHED_PROVENANCE } from "./generatedSharodiyaImports";
import { APPROVED_PANDAL_IMAGES } from "./generatedPandalImageManifest";
import { dedupePandalImages, type PandalImage } from "./imageLibrary";
import { KOLKATAKHOJ_2026_EXACT_PASSPORT_MATCHES, KOLKATAKHOJ_2026_SOURCE } from "./kolkataKhoj2026";

export type Section = "North Kolkata" | "South Kolkata" | "Central Kolkata" | "East Kolkata" | "West Kolkata" | "Salt Lake" | "New Town" | "Howrah" | "Hooghly" | "North 24 Parganas" | "South 24 Parganas";
export type CrowdLevel = "Low" | "Moderate" | "High" | "Very high" | "Information unavailable";
export type TransportMode = "Walking" | "Metro + Walking" | "Public Transport" | "Car" | "Bike" | "Mixed";

export type PandalRecord = {
  id: string;
  name: string;
  section: Section;
  subArea: string;
  address: string;
  landmark: string;
  latitude: number;
  longitude: number;
  popularity: number;
  rating: number;
  artistic: number;
  traditional: number;
  family: number;
  crowd: CrowdLevel;
  visitMinutes: number;
  waitMinutes: number;
  openingHours: string;
  metro: string;
  tags: string[];
  verifiedStatus: "Historical presence documented" | "Verified" | "Partially verified" | "Unverified";
  isDevelopmentData: boolean;
  sources: Array<{ label: string; url: string }>;
  /** The primary approved catalogue image; never a private Amar Pujo memory. */
  image?: PandalImage;
  /** Approved, attribution-complete public catalogue images for this existing record. */
  images?: PandalImage[];
  established?: number;
  theme2026?: string;
  status2026?: string;
  confidence?: string;
  priority?: "S" | "A" | "B" | "C";
  addressSource?: string;
  mapSearchUrl?: string;
  coordinateSource?: string;
  coordinateRetrievedAt?: string;
  coordinateConfidence?: "high" | "medium" | "low";
  coordinateQuery?: string;
  coordinateDisplayName?: string;
  coordinateVerificationMethod?: string;
  userRank?: number;
  visitorContext?: VisitorContext;
  /** Stable identifier retained through name-variant merges; never an array index. */
  canonicalId?: string;
  canonicalName?: string;
  aliases?: string[];
  /** Rank and priority imported from the user's data must remain distinct from future verification. */
  userSuppliedRank?: number;
  suppliedPriority?: "S" | "A" | "B" | "C";
  verifiedPriority?: "S" | "A" | "B" | "C";
  computedRank?: number;
  addressDetails?: AddressDetails;
  sourceMetadata?: SourceMetadata[];
  season2026Status?: "not verified" | "historical context only" | "partially verified" | "verified";
  lastVerifiedAt?: string;
  /** Source-specific Passport classification; it never changes PujoParikroma’s own rank, section, or verification state. */
  kolkataKhoj2026?: { sourceId: string; sourceZone: "North" | "Central" | "South" | "Salt Lake"; sourceFeatured: boolean; sourceUrl: string; matchStatus: "exact_or_alias_match" };
};

/** Lightweight public shape for directory and photo-highlight cards; full provenance remains on the detail endpoint. */
export type PandalListItem = Pick<PandalRecord, "id" | "name" | "section" | "subArea" | "address" | "priority" | "userRank" | "sources" | "mapSearchUrl" | "image" | "images" | "visitorContext" | "kolkataKhoj2026">;

export const toPandalListItem = (record: PandalRecord): PandalListItem => ({
  id: record.id,
  name: record.name,
  section: record.section,
  subArea: record.subArea,
  address: record.address,
  priority: record.priority,
  userRank: record.userRank,
  sources: record.sources,
  mapSearchUrl: record.mapSearchUrl,
  image: record.image,
  images: record.images,
  visitorContext: record.visitorContext,
  kolkataKhoj2026: record.kolkataKhoj2026,
});

/** Zero denotes intentionally unavailable operational information, never a real-world measurement. */
const UNAVAILABLE_OPERATIONAL_FIELDS = { latitude: 0, longitude: 0, popularity: 0, rating: 0, artistic: 0, traditional: 0, family: 0, visitMinutes: 0, waitMinutes: 0 };

/**
 * Real committee identities cross-checked against public Puja guides/maps.
 * Seasonal operational data is intentionally unavailable until an authorised
 * 2026 import supplies source-backed location, time, crowd and route details.
 */
export const DEVELOPMENT_PANDALS: PandalRecord[] = [
  { ...UNAVAILABLE_OPERATIONAL_FIELDS, id: "ae-part-2-durga-puja", name: "AE (Part-2) Durga Puja", canonicalName: "AE (Part-2) Durga Puja", section: "Salt Lake", subArea: "AE Block, Sector 1, Bidhannagar", address: "AE Block, Sector 1, Bidhannagar, Kolkata", landmark: "Information unavailable", crowd: "Information unavailable", openingHours: "2026 seasonal timing unavailable", metro: "Information unavailable", tags: ["Sharodiya discovery", "Salt Lake"], verifiedStatus: "Partially verified", isDevelopmentData: false, sources: [{ label: "Sharodiya 2026 Salt Lake route (discovery lead)", url: "https://sharodiya.com/pandal-hopping-routes" }, { label: "The Telegraph Salt Lake Puja guide 2025", url: "https://www.telegraphindia.com/west-bengal/kolkata/puja-2025-guide-top-pandals-cultural-picks-food-stops-in-salt-lake-prnt/cid/2125072" }], status2026: "Appears on a public 2026 route page; current-season programme, access, and timings are not independently verified.", lastVerifiedAt: "2026-08-24" },
  { ...UNAVAILABLE_OPERATIONAL_FIELDS, id: "karunamoyee-housing-estate-g-block-durga-puja", name: "Durga Puja, Karunamoyee Housing Estate G Block", canonicalName: "Durga Puja, Karunamoyee Housing Estate G Block", section: "Salt Lake", subArea: "ED Block, Sector 2, Bidhannagar", address: "ED Block, Sector 2, Bidhannagar, Kolkata", landmark: "Information unavailable", crowd: "Information unavailable", openingHours: "2026 seasonal timing unavailable", metro: "Information unavailable", tags: ["Sharodiya discovery", "Salt Lake"], verifiedStatus: "Partially verified", isDevelopmentData: false, sources: [{ label: "Sharodiya 2026 Salt Lake route (discovery lead)", url: "https://sharodiya.com/pandal-hopping-routes" }, { label: "The Telegraph Karunamoyee location report 2015", url: "https://www.telegraphindia.com/west-bengal/next-door-to-the-thana/cid/1468612" }], status2026: "Appears on a public 2026 route page; current-season programme, access, and timings are not independently verified.", lastVerifiedAt: "2026-08-24" },
  { ...UNAVAILABLE_OPERATIONAL_FIELDS, id: "ekdalia-evergreen", name: "Ekdalia Evergreen Club", section: "South Kolkata", subArea: "Ballygunge", address: "Information unavailable", landmark: "Information unavailable", crowd: "Information unavailable", openingHours: "2026 seasonal timing unavailable", metro: "Information unavailable", tags: ["Established committee", "South Kolkata"], verifiedStatus: "Historical presence documented", isDevelopmentData: false, sources: [{ label: "LBB 2025 South Kolkata guide", url: "https://lbb.in/kolkata/9-best-pujo-pandals-south-kolkata/" }, { label: "The Pujo Company map", url: "https://www.thepujo.com/pujo-map" }], image: { url: "/manus-storage/ekdalia-evergreen-2017_8738c1da.jpg", alt: "Historical 2017 photograph of Ekdalia Evergreen Durga Puja", author: "Biswarup Ganguly", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Durga_With_Her_Family_-_Ekdalia_Evergreen_-_Ekdalia_Road_-_Kolkata_2017-09-27_4114.JPG", capturedYear: 2017 } },
  { ...UNAVAILABLE_OPERATIONAL_FIELDS, id: "chetla-agrani", name: "Chetla Agrani Club", section: "South Kolkata", subArea: "Chetla", address: "Information unavailable", landmark: "Information unavailable", crowd: "Information unavailable", openingHours: "2026 seasonal timing unavailable", metro: "Information unavailable", tags: ["Established committee", "South Kolkata"], verifiedStatus: "Historical presence documented", isDevelopmentData: false, sources: [{ label: "LBB 2025 South Kolkata guide", url: "https://lbb.in/kolkata/9-best-pujo-pandals-south-kolkata/" }, { label: "The Pujo Company map", url: "https://www.thepujo.com/pujo-map" }] },
  { ...UNAVAILABLE_OPERATIONAL_FIELDS, id: "tridhara-sammilani", name: "Tridhara Sammilani", section: "South Kolkata", subArea: "South Kolkata", address: "Information unavailable", landmark: "Information unavailable", crowd: "Information unavailable", openingHours: "2026 seasonal timing unavailable", metro: "Information unavailable", tags: ["Established committee", "South Kolkata"], verifiedStatus: "Historical presence documented", isDevelopmentData: false, sources: [{ label: "LBB 2025 South Kolkata guide", url: "https://lbb.in/kolkata/9-best-pujo-pandals-south-kolkata/" }, { label: "The Pujo Company map", url: "https://www.thepujo.com/pujo-map" }] },
  { ...UNAVAILABLE_OPERATIONAL_FIELDS, id: "suruchi-sangha", name: "Suruchi Sangha", section: "South Kolkata", subArea: "South Kolkata", address: "Information unavailable", landmark: "Information unavailable", crowd: "Information unavailable", openingHours: "2026 seasonal timing unavailable", metro: "Information unavailable", tags: ["Established committee", "South Kolkata"], verifiedStatus: "Historical presence documented", isDevelopmentData: false, sources: [{ label: "LBB 2025 South Kolkata guide", url: "https://lbb.in/kolkata/9-best-pujo-pandals-south-kolkata/" }, { label: "The Pujo Company map", url: "https://www.thepujo.com/pujo-map" }] },
  { ...UNAVAILABLE_OPERATIONAL_FIELDS, id: "kumartuli-park", name: "Kumartuli Park", section: "North Kolkata", subArea: "Kumartuli", address: "Information unavailable", landmark: "Information unavailable", crowd: "Information unavailable", openingHours: "2026 seasonal timing unavailable", metro: "Information unavailable", tags: ["Established committee", "North Kolkata"], verifiedStatus: "Historical presence documented", isDevelopmentData: false, sources: [{ label: "The Pujo Company map", url: "https://www.thepujo.com/pujo-map" }, { label: "Wikimedia Commons historical Kumartuli Park image", url: "https://commons.wikimedia.org/wiki/File:Durga_Puja_Pandal_-_Kumartuly_Sarvojanin_-_Kumartuli_Park_-_Kolkata_2013-10-13_01853.jpg" }], image: { url: "/manus-storage/kumartuli-park-2013_11330d1c.jpg", alt: "Historical 2013 photograph of a Kumartuli Park Durga Puja pandal", author: "Biswarup Ganguly", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Durga_Puja_Pandal_-_Kumartuly_Sarvojanin_-_Kumartuli_Park_-_Kolkata_2013-10-13_01853.jpg", capturedYear: 2013 } },
];

const normalizedName = normalizePujaName;
const isUnavailable = (value: string | undefined) => !value || value === "Information unavailable";
const mergeNameVariants = (records: PandalRecord[]): PandalRecord[] => {
  const merged = new Map<string, PandalRecord>();
  for (const record of records) {
    const key = normalizedName(record.name);
    const existing = merged.get(key);
    if (!existing) { merged.set(key, { ...record, aliases: record.aliases ?? [] }); continue; }
    const aliases = Array.from(new Set([...(existing.aliases ?? []), existing.name, ...(record.aliases ?? []), record.name])).filter(name => name !== existing.name);
    const preferRecordAddress = isUnavailable(existing.address) && !isUnavailable(record.address);
    const preferRecordCoordinates = existing.latitude === 0 && existing.longitude === 0 && (record.latitude !== 0 || record.longitude !== 0);
    merged.set(key, {
      ...existing,
      ...(preferRecordAddress ? { address: record.address, landmark: record.landmark, addressSource: record.addressSource, mapSearchUrl: record.mapSearchUrl } : {}),
      ...(preferRecordCoordinates ? { latitude: record.latitude, longitude: record.longitude, coordinateSource: record.coordinateSource, coordinateRetrievedAt: record.coordinateRetrievedAt, coordinateConfidence: record.coordinateConfidence } : {}),
      aliases,
      priority: existing.priority ?? record.priority,
      userRank: existing.userRank ?? record.userRank,
      image: existing.image ?? record.image,
      tags: Array.from(new Set([...existing.tags, ...record.tags])),
      sources: Array.from(new Map([...existing.sources, ...record.sources].map(source => [source.url, source])).values()),
    });
  }
  return Array.from(merged.values());
};
const imageOverrides: Record<string, NonNullable<PandalRecord["image"]>> = {
  "bagbazar": { url: "/manus-storage/bagbazar-public-domain-commons_68b7daca.jpg", alt: "Historical photograph of Bagbazar Sarbojanin Durga Puja idol", author: "Jonoikobangali", license: "Public domain", sourceUrl: "https://commons.wikimedia.org/wiki/File:Bagbazar_sarbojonin_Durgapuja.jpg", capturedYear: 2008 },
  "ahiritola": { url: "/manus-storage/ahiritola-sarbojanin-2018-commons_edafd87e.jpg", alt: "Historical 2018 photograph of Ahiritola Sarbojanin Durga Puja idol", author: "Indrajit Das", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:DurgaPuja2018_-_Durga_Idol_of_Ahiritola_Sarbojanin_in_Kolkata_20.jpg", capturedYear: 2018 },
  "college square": { url: "/manus-storage/college-square-2022-commons_66de541e.jpg", alt: "Historical 2022 photograph of College Square Durga Puja pandal", author: "Tarunsamanta", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:DurgaPuja2022_-_Durga_Puja_Pandal_of_College_square_05.jpg", capturedYear: 2022 },
  "sovabazar rajbari": { url: "/manus-storage/sovabazar-rajbari-2015-commons_896470e4.jpg", alt: "Historical 2015 photograph of Sovabazar Rajbari Durga Puja idol", author: "Dassurojitsd", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Shobhabazar_Rajbari_Durga_Puja.jpg", capturedYear: 2015 },
  "chetla agrani": { url: "/manus-storage/chetla-agrani-2025-commons_8bc0298e.jpg", alt: "Historical 2025 photograph of Chetla Agrani Club Durga Puja", author: "Goutam1962", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Shakti_roopa_at_Chetla_Agrani_Club.jpg", capturedYear: 2025 },
  "sreebhumi sporting": { url: "/manus-storage/sreebhumi-sporting-2014-commons_f4862723.jpg", alt: "Historical 2014 photograph of Sreebhumi Sporting Club Durga Puja pandal", author: "Biswarup Ganguly", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Durga_Puja_Pandal_-_Sree_Bhumi_Sporting_Club_-_Sreebhumi_-_Kolkata_2014-10-02_8694.JPG", capturedYear: 2014 },
  "barisha": { url: "/manus-storage/barisha-sarbojanin-2010-commons_a8b8cfe7.jpg", alt: "Historical 2010 photograph of Barisha Sarbojanin Durga Puja idol", author: "Jonoikobangali", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Durga_(frontal)_Barisha_Sarbojanin_2010_Arnab_Dutta.JPG", capturedYear: 2010 },
  "suruchi sangha": { url: "/manus-storage/suruchi-sangha-2015-commons_f2ce0ec6.jpg", alt: "Historical 2015 photograph of New Alipore Suruchi Sangha Durga Puja pandal", author: "Biswarup Ganguly", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Durga_Puja_Pandal_-_New_Alipore_Suruchi_Sangha_-_Kolkata_2015-10-21_6518.JPG", capturedYear: 2015 },
  "ballygunge cultural": { url: "/manus-storage/ballygunge-cultural-2019-commons_5210efa2.jpg", alt: "Historical 2019 photograph of Ballygunge Cultural Association Durga Puja", author: "Sumita Roy Dutta", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ballygunge_Cultural_Association_Durga_Puja_2019_IMG_20191005_221243_03.jpg", capturedYear: 2019 },
  "maddox square": { url: "/manus-storage/maddox-square-2010-commons_c08b9ae3.webp", alt: "Historical 2010 photograph of Durga Puja at Maddox Square", author: "Jonoikobangali", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Durga_Maddox_Square_2010_Arnab_Dutta.JPG", capturedYear: 2010 },
};
const recordOverrides: Record<string, Partial<PandalRecord>> = {
  "tala prattoy": { status2026: "The official site announces a paid artist-led group walkthrough for 2026; confirm slots and entry terms directly with Tala Prattoy." },
  "dakshin kolkata aikatan": {
    name: "Dakshin Kalikata Sarbojanin (Aikatan)",
    canonicalName: "Dakshin Kalikata Sarbojanin (Aikatan)",
    aliases: ["Dakshin Kolkata Sarbojanin Aikatan", "Aikatan, Dakshin Kolkata Sarbajanin Durgapujo"],
    subArea: "Bhowanipore",
    address: "16 B, Priyanath Mallick Road, Kolkata, West Bengal",
    addressSource: "Official committee page checked 2026-08-23",
    mapSearchUrl: "https://www.google.com/maps/search/?api=1&query=16%20B%2C%20Priyanath%20Mallick%20Road%2C%20Kolkata%2C%20West%20Bengal",
    verifiedStatus: "Partially verified",
    tags: ["Committee identity verified", "South Kolkata"],
    sources: [
      { label: "Sharodiya public directory (discovery lead)", url: "https://sharodiya.com/pandals" },
      { label: "Official committee Facebook page: Dakshin Kalikata Sarbojanin Bhowanipore - Aikatan", url: "https://www.facebook.com/dakshinkalikatasarbojanin/" },
    ],
    status2026: "The committee identity and listed address were checked on its public committee page; 2026 operational details are not verified.",
    lastVerifiedAt: "2026-08-23",
  },
};
const enrichWithVisitorContext = (record: PandalRecord): PandalRecord => {
  const context = getVisitorContext(record.name);
  const ranking = USER_RANKS_BY_NORMALIZED_NAME[normalizedName(record.name) as keyof typeof USER_RANKS_BY_NORMALIZED_NAME];
  const image = imageOverrides[normalizedName(record.name)] ?? record.image;
  const override = recordOverrides[normalizedName(record.name)];
  if (!context && !ranking && !image && !override) return record;
  const mergedAliases = Array.from(new Set([...(record.aliases ?? []), ...(override?.aliases ?? [])]));
  const mergedSources = Array.from(new Map([...record.sources, ...(override?.sources ?? [])].map(source => [source.url, source])).values());
  if (!context) return { ...record, ...override, userRank: ranking?.rank ?? record.userRank, priority: (ranking?.priority as PandalRecord["priority"] | undefined) ?? record.priority, image };
  const source = { label: context.sourceLabel, url: context.sourceUrl };
  return {
    ...record,
    ...override,
    userRank: context.rank ?? ranking?.rank,
    priority: record.priority ?? (ranking?.priority as PandalRecord["priority"] | undefined),
    visitorContext: context,
    image,
    aliases: mergedAliases,
    tags: Array.from(new Set([context.lens, "Visitor guide", ...record.tags])),
    sources: mergedSources.some(item => item.url === source.url) ? mergedSources : [...mergedSources, source],
  };
};

const applyGovernance = (record: PandalRecord): PandalRecord => ({
  ...record,
  canonicalId: record.canonicalId ?? record.id,
  canonicalName: record.canonicalName ?? record.name,
  aliases: Array.from(new Set(record.aliases ?? [])),
  userSuppliedRank: record.userRank,
  suppliedPriority: record.priority,
  addressDetails: deriveAddressDetails(record.id, record.address, record.section, record.subArea),
  sourceMetadata: record.sourceMetadata ?? record.sources.map(source => ({ label: source.label, url: source.url, type: classifySource(source.label, source.url), retrievedAt: record.lastVerifiedAt ?? record.coordinateRetrievedAt })),
  season2026Status: record.status2026 ? "partially verified" : record.visitorContext ? "historical context only" : "not verified",
  lastVerifiedAt: record.coordinateRetrievedAt,
});

/** Earlier sources take precedence; user-supplied address rows add breadth without overwriting validated records. */
/** Base canonical catalogue, kept separate so external-source import reports can compare against a stable prior state. */
export const BASE_PANDALS: PandalRecord[] = mergeNameVariants([...DEVELOPMENT_PANDALS, ...GENERATED_2026_PANDALS, ...ADDRESS_DATASET_PANDALS]).map(enrichWithVisitorContext).map(applyGovernance);

const applySharodiyaMatchedProvenance = (record: PandalRecord): PandalRecord => {
  const addition = SHARODIYA_MATCHED_PROVENANCE[record.canonicalId ?? record.id];
  if (!addition) return record;
  const sources = Array.from(new Map([...record.sources, ...addition.sources].map(source => [source.url, source])).values());
  const sourceMetadata = Array.from(new Map([...(record.sourceMetadata ?? []), ...addition.sources.map(source => ({ ...source, type: "discovery source" as const, retrievedAt: "2026-08-24" }))].map(source => [source.url, source])).values());
  return { ...record, aliases: Array.from(new Set([...(record.aliases ?? []), ...addition.aliases])).filter(alias => alias !== record.name), sources, sourceMetadata };
};

const applyKolkataKhojPassportProvenance = (record: PandalRecord): PandalRecord => {
  const canonicalId = record.canonicalId ?? record.id;
  const match = KOLKATAKHOJ_2026_EXACT_PASSPORT_MATCHES[canonicalId as keyof typeof KOLKATAKHOJ_2026_EXACT_PASSPORT_MATCHES];
  if (!match) return record;
  const source = { label: "KolkataKhoj 2026 Pandal Passport (exact name or alias match)", url: KOLKATAKHOJ_2026_SOURCE.url };
  const sources = record.sources.some(item => item.url === source.url) ? record.sources : [...record.sources, source];
  const sourceMetadata = Array.from(new Map([...(record.sourceMetadata ?? []), { ...source, type: "discovery source" as const, retrievedAt: "2026-08-24" }].map(item => [item.url, item])).values());
  return { ...record, sources, sourceMetadata, kolkataKhoj2026: { sourceId: match.sourceId, sourceZone: match.zone, sourceFeatured: match.featured, sourceUrl: KOLKATAKHOJ_2026_SOURCE.url, matchStatus: "exact_or_alias_match" } };
};

const attachApprovedImageManifest = (record: PandalRecord): PandalRecord => {
  const legacy = record.image ? [{ ...record.image, source: record.image.source ?? "legacy" as const, rightsStatus: record.image.rightsStatus ?? (record.image.license === "Public domain" ? "public_domain" as const : "verified_open_license" as const), verificationStatus: "verified" as const, imagePeriod: record.image.imagePeriod ?? "historical" as const, isPrimary: true }] : [];
  const approved = APPROVED_PANDAL_IMAGES[record.id] ?? [];
  const images = dedupePandalImages([...legacy, ...approved]);
  if (!images.length) return record;
  const primary = images.find(image => image.isPrimary) ?? images[0];
  return { ...record, image: primary, images };
};

/** The sole runtime catalogue: base records plus provenance-labelled imports generated by the reproducible pipeline. */
export const ALL_PANDALS: PandalRecord[] = mergeNameVariants([...BASE_PANDALS.map(applySharodiyaMatchedProvenance), ...SHARODIYA_IMPORTED_PANDALS]).map(enrichWithVisitorContext).map(attachApprovedImageManifest).map(applyGovernance).map(applyKolkataKhojPassportProvenance);

export const SECTIONS: Section[] = ["North Kolkata", "South Kolkata", "Central Kolkata", "East Kolkata", "West Kolkata", "Salt Lake", "New Town"];
