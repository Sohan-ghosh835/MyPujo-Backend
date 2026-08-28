CREATE TABLE `coordinateQueryCache` (
	`id` int AUTO_INCREMENT NOT NULL,
	`queryHash` varchar(64) NOT NULL,
	`normalizedQuery` text NOT NULL,
	`source` varchar(80) NOT NULL,
	`sourceUrl` text NOT NULL,
	`displayName` text NOT NULL,
	`matchedAddress` text,
	`latitudeE6` int NOT NULL,
	`longitudeE6` int NOT NULL,
	`osmType` varchar(24),
	`osmId` varchar(48),
	`retrievedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coordinateQueryCache_id` PRIMARY KEY(`id`),
	CONSTRAINT `coordinate_query_cache_hash_idx` UNIQUE(`queryHash`)
);
--> statement-breakpoint
CREATE TABLE `coordinateResolutionRuns` (
	`id` varchar(64) NOT NULL,
	`state` enum('queued','running','completed','failed') NOT NULL DEFAULT 'queued',
	`totalRecords` int NOT NULL,
	`processedRecords` int NOT NULL DEFAULT 0,
	`verifiedCount` int NOT NULL DEFAULT 0,
	`resolvedCount` int NOT NULL DEFAULT 0,
	`reviewRequiredCount` int NOT NULL DEFAULT 0,
	`unresolvedCount` int NOT NULL DEFAULT 0,
	`rejectedCount` int NOT NULL DEFAULT 0,
	`sourcePolicy` text NOT NULL,
	`errorMessage` text,
	`startedAt` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coordinateResolutionRuns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `coordinateCandidates` ADD `normalizedQuery` text;--> statement-breakpoint
ALTER TABLE `coordinateCandidates` ADD `queryHash` varchar(64);--> statement-breakpoint
ALTER TABLE `coordinateCandidates` ADD `matchedAddress` text;--> statement-breakpoint
ALTER TABLE `coordinateCandidates` ADD `evidenceScore` int;--> statement-breakpoint
ALTER TABLE `coordinateCandidates` ADD `resolutionRunId` varchar(64);--> statement-breakpoint
CREATE INDEX `coordinate_resolution_runs_state_idx` ON `coordinateResolutionRuns` (`state`);--> statement-breakpoint
CREATE INDEX `coordinate_candidates_query_hash_idx` ON `coordinateCandidates` (`queryHash`);