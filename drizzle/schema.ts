import {
  boolean,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const pujaSeasons = mysqlTable("pujaSeasons", {
  id: int("id").autoincrement().primaryKey(),
  year: int("year").notNull().unique(),
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  label: varchar("label", { length: 96 }).notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const pandals = mysqlTable(
  "pandals",
  {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 220 }).notNull(),
    section: varchar("section", { length: 64 }).notNull(),
    subArea: varchar("subArea", { length: 96 }),
    address: text("address"),
    landmark: varchar("landmark", { length: 180 }),
    latitudeE6: int("latitudeE6"),
    longitudeE6: int("longitudeE6"),
    tags: json("tags").$type<string[]>(),
    isActive: boolean("isActive").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    slugIndex: uniqueIndex("pandals_slug_idx").on(table.slug),
    sectionIndex: index("pandals_section_idx").on(table.section),
    nameIndex: index("pandals_name_idx").on(table.name),
  }),
);

export const pandalSeasonData = mysqlTable(
  "pandalSeasonData",
  {
    id: int("id").autoincrement().primaryKey(),
    pandalId: int("pandalId").notNull(),
    seasonId: int("seasonId").notNull(),
    theme: text("theme"),
    popularityScore: int("popularityScore"),
    overallRatingTenths: int("overallRatingTenths"),
    artisticScore: int("artisticScore"),
    traditionalScore: int("traditionalScore"),
    familyScore: int("familyScore"),
    crowdLevel: mysqlEnum("crowdLevel", ["unavailable", "low", "moderate", "high", "very_high", "extreme"])
      .default("unavailable")
      .notNull(),
    estimatedVisitMinutes: int("estimatedVisitMinutes"),
    estimatedWaitMinutes: int("estimatedWaitMinutes"),
    openingTime: varchar("openingTime", { length: 8 }),
    closingTime: varchar("closingTime", { length: 8 }),
    metroStations: json("metroStations").$type<string[]>(),
    verificationStatus: mysqlEnum("verificationStatus", ["verified", "partial", "unverified", "inactive", "development"])
      .default("unverified")
      .notNull(),
    sourceName: varchar("sourceName", { length: 180 }),
    sourceUrl: text("sourceUrl"),
    verifiedAt: timestamp("verifiedAt"),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    seasonIndex: index("pandalSeasonData_season_idx").on(table.seasonId),
    pandalSeasonIndex: uniqueIndex("pandalSeasonData_pandal_season_idx").on(table.pandalId, table.seasonId),
  }),
);

export const savedRoutes = mysqlTable("savedRoutes", {
  id: int("id").autoincrement().primaryKey(),
  shareToken: varchar("shareToken", { length: 64 }).notNull().unique(),
  userId: int("userId"),
  seasonId: int("seasonId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  plannerInput: json("plannerInput").$type<Record<string, unknown>>().notNull(),
  routeResult: json("routeResult").$type<Record<string, unknown>>().notNull(),
  isPublic: boolean("isPublic").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const userPandalStates = mysqlTable(
  "userPandalStates",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    pandalId: int("pandalId").notNull(),
    seasonId: int("seasonId").notNull(),
    isFavourite: boolean("isFavourite").default(false).notNull(),
    visitedAt: timestamp("visitedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userPandalSeasonIndex: uniqueIndex("userPandalStates_user_pandal_season_idx").on(table.userId, table.pandalId, table.seasonId),
  }),
);

export const crowdReports = mysqlTable("crowdReports", {
  id: int("id").autoincrement().primaryKey(),
  pandalId: int("pandalId").notNull(),
  seasonId: int("seasonId").notNull(),
  userId: int("userId"),
  crowdLevel: mysqlEnum("crowdLevel", ["low", "moderate", "high", "very_high", "extreme"]).notNull(),
  queueBand: mysqlEnum("queueBand", ["none", "under_10", "ten_to_30", "thirty_to_60", "over_60"]).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "hidden"]).default("pending").notNull(),
  reportedAt: timestamp("reportedAt").defaultNow().notNull(),
});

export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  pandalId: int("pandalId").notNull(),
  seasonId: int("seasonId").notNull(),
  userId: int("userId").notNull(),
  ratingTenths: int("ratingTenths").notNull(),
  reviewText: text("reviewText"),
  status: mysqlEnum("status", ["pending", "approved", "hidden"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const catalogueCorrections = mysqlTable(
  "catalogueCorrections",
  {
    id: int("id").autoincrement().primaryKey(),
    recordId: varchar("recordId", { length: 220 }),
    issueType: mysqlEnum("issueType", ["name", "address", "location", "image", "source", "season2026", "other"]).notNull(),
    details: text("details").notNull(),
    pageUrl: varchar("pageUrl", { length: 512 }),
    reporterContact: varchar("reporterContact", { length: 320 }),
    status: mysqlEnum("status", ["pending", "reviewed", "resolved", "dismissed"]).default("pending").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    recordIndex: index("catalogue_corrections_record_idx").on(table.recordId),
    statusIndex: index("catalogue_corrections_status_idx").on(table.status),
  }),
);

/**
 * A single latest candidate per canonical record. Candidate coordinates never
 * become public navigation destinations until an administrator explicitly
 * approves them with retained source and review metadata.
 */
export const coordinateCandidates = mysqlTable(
  "coordinateCandidates",
  {
    id: int("id").autoincrement().primaryKey(),
    recordId: varchar("recordId", { length: 220 }).notNull(),
    latitudeE6: int("latitudeE6").notNull(),
    longitudeE6: int("longitudeE6").notNull(),
    source: varchar("source", { length: 80 }).notNull(),
    sourceUrl: text("sourceUrl").notNull(),
    query: text("query").notNull(),
    displayName: text("displayName").notNull(),
    osmType: varchar("osmType", { length: 24 }),
    osmId: varchar("osmId", { length: 48 }),
    confidence: mysqlEnum("confidence", ["high", "medium", "low", "unverified"]).default("unverified").notNull(),
    status: mysqlEnum("status", ["candidate", "resolved", "approved", "rejected", "unresolved", "review_required"]).default("candidate").notNull(),
    verificationMethod: varchar("verificationMethod", { length: 80 }).default("nominatim-candidate").notNull(),
    normalizedQuery: text("normalizedQuery"),
    queryHash: varchar("queryHash", { length: 64 }),
    matchedAddress: text("matchedAddress"),
    evidenceScore: int("evidenceScore"),
    resolutionRunId: varchar("resolutionRunId", { length: 64 }),
    reviewerId: int("reviewerId"),
    reviewNote: text("reviewNote"),
    retrievedAt: timestamp("retrievedAt").defaultNow().notNull(),
    reviewedAt: timestamp("reviewedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    recordIndex: uniqueIndex("coordinate_candidates_record_idx").on(table.recordId),
    statusIndex: index("coordinate_candidates_status_idx").on(table.status),
    queryHashIndex: index("coordinate_candidates_query_hash_idx").on(table.queryHash),
  }),
);

/** Cached, source-attributed results used by bounded one-off catalogue resolution. */
export const coordinateQueryCache = mysqlTable(
  "coordinateQueryCache",
  {
    id: int("id").autoincrement().primaryKey(),
    queryHash: varchar("queryHash", { length: 64 }).notNull(),
    normalizedQuery: text("normalizedQuery").notNull(),
    source: varchar("source", { length: 80 }).notNull(),
    sourceUrl: text("sourceUrl").notNull(),
    displayName: text("displayName").notNull(),
    matchedAddress: text("matchedAddress"),
    latitudeE6: int("latitudeE6").notNull(),
    longitudeE6: int("longitudeE6").notNull(),
    osmType: varchar("osmType", { length: 24 }),
    osmId: varchar("osmId", { length: 48 }),
    retrievedAt: timestamp("retrievedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({ queryHashIndex: uniqueIndex("coordinate_query_cache_hash_idx").on(table.queryHash) }),
);

/** A finite auto-resolution run, retained for progress and final coverage reporting. */
export const coordinateResolutionRuns = mysqlTable(
  "coordinateResolutionRuns",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    state: mysqlEnum("state", ["queued", "running", "completed", "failed"]).default("queued").notNull(),
    totalRecords: int("totalRecords").notNull(),
    processedRecords: int("processedRecords").default(0).notNull(),
    verifiedCount: int("verifiedCount").default(0).notNull(),
    resolvedCount: int("resolvedCount").default(0).notNull(),
    reviewRequiredCount: int("reviewRequiredCount").default(0).notNull(),
    unresolvedCount: int("unresolvedCount").default(0).notNull(),
    rejectedCount: int("rejectedCount").default(0).notNull(),
    sourcePolicy: text("sourcePolicy").notNull(),
    errorMessage: text("errorMessage"),
    startedAt: timestamp("startedAt"),
    completedAt: timestamp("completedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({ stateIndex: index("coordinate_resolution_runs_state_idx").on(table.state) }),
);

/**
 * Review-only public-image candidates imported from traceable link datasets.
 * This table never stores image bytes and approval alone does not publish an
 * image; the existing manifest still requires a managed asset and licence data.
 */
export const pandalImageCandidates = mysqlTable(
  "pandalImageCandidates",
  {
    id: int("id").autoincrement().primaryKey(),
    candidateId: varchar("candidateId", { length: 96 }).notNull(),
    recordId: varchar("recordId", { length: 220 }).notNull(),
    imageUrl: text("imageUrl").notNull(),
    sourcePage: text("sourcePage").notNull(),
    source: varchar("source", { length: 80 }).notNull(),
    sourceDomain: varchar("sourceDomain", { length: 180 }),
    sourceTier: mysqlEnum("sourceTier", ["official", "open_repository", "discovery_reference", "search_discovery", "other"]).default("open_repository").notNull(),
    discoveredFrom: varchar("discoveredFrom", { length: 96 }).default("dataset_import").notNull(),
    importBatchId: varchar("importBatchId", { length: 96 }).default("legacy").notNull(),
    originalFilename: text("originalFilename").notNull(),
    inferredName: text("inferredName").notNull(),
    matchMethod: varchar("matchMethod", { length: 96 }).notNull(),
    matchConfidence: int("matchConfidence").notNull(),
    license: varchar("license", { length: 160 }),
    attribution: text("attribution"),
    licenseUrl: text("licenseUrl"),
    usageStatus: mysqlEnum("usageStatus", ["unknown", "license_verified", "approved_for_publication", "restricted", "broken", "removed"]).default("unknown").notNull(),
    status: mysqlEnum("status", ["discovered", "candidate", "matched", "needs_review", "license_unknown", "approved", "published", "rejected", "broken", "removed", "unmatched", "review_required", "unreachable", "duplicate", "no_match"]).default("review_required").notNull(),
    capturedYear: int("capturedYear"),
    yearConfidence: mysqlEnum("yearConfidence", ["verified", "source_stated", "inferred", "unknown"]).default("unknown").notNull(),
    contentType: varchar("contentType", { length: 96 }),
    width: int("width"),
    height: int("height"),
    byteSize: int("byteSize"),
    technicalQualityScore: int("technicalQualityScore"),
    qualityNote: text("qualityNote"),
    visualMatchConfidence: int("visualMatchConfidence"),
    sha256: varchar("sha256", { length: 96 }),
    perceptualHash: varchar("perceptualHash", { length: 96 }),
    duplicateGroup: varchar("duplicateGroup", { length: 96 }),
    validationNote: text("validationNote"),
    managedAssetUrl: text("managedAssetUrl"),
    managedAssetKey: varchar("managedAssetKey", { length: 512 }),
    assetAttachedAt: timestamp("assetAttachedAt"),
    lastValidatedAt: timestamp("lastValidatedAt"),
    publishedAt: timestamp("publishedAt"),
    removedAt: timestamp("removedAt"),
    reviewerId: int("reviewerId"),
    reviewNote: text("reviewNote"),
    reviewedAt: timestamp("reviewedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    candidateIndex: uniqueIndex("pandal_image_candidates_candidate_idx").on(table.candidateId),
    recordIndex: index("pandal_image_candidates_record_idx").on(table.recordId),
    statusIndex: index("pandal_image_candidates_status_idx").on(table.status),
    batchIndex: index("pandal_image_candidates_batch_idx").on(table.importBatchId),
    sourceIndex: index("pandal_image_candidates_source_idx").on(table.source),
    yearIndex: index("pandal_image_candidates_year_idx").on(table.capturedYear),
    qualityIndex: index("pandal_image_candidates_quality_idx").on(table.technicalQualityScore),
  }),
);

/** Per-canonical-record discovery evidence used for the missing-image work queue. */
export const pandalImageDiscoveryStates = mysqlTable(
  "pandalImageDiscoveryStates",
  {
    id: int("id").autoincrement().primaryKey(),
    recordId: varchar("recordId", { length: 220 }).notNull(),
    status: mysqlEnum("status", ["not_searched", "searching", "candidates_found", "review_required", "no_verified_image_found", "verified"]).default("not_searched").notNull(),
    sourcesChecked: int("sourcesChecked").default(0).notNull(),
    searchVariants: json("searchVariants").$type<string[]>(),
    candidateCount: int("candidateCount").default(0).notNull(),
    lastSearchedAt: timestamp("lastSearchedAt"),
    noImageReason: text("noImageReason"),
    importBatchId: varchar("importBatchId", { length: 96 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    recordIndex: uniqueIndex("pandal_image_discovery_record_idx").on(table.recordId),
    statusIndex: index("pandal_image_discovery_status_idx").on(table.status),
  }),
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
