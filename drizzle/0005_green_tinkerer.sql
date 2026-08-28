CREATE TABLE `pandalImageDiscoveryStates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recordId` varchar(220) NOT NULL,
	`status` enum('not_searched','searching','candidates_found','review_required','no_verified_image_found','verified') NOT NULL DEFAULT 'not_searched',
	`sourcesChecked` int NOT NULL DEFAULT 0,
	`searchVariants` json,
	`candidateCount` int NOT NULL DEFAULT 0,
	`lastSearchedAt` timestamp,
	`noImageReason` text,
	`importBatchId` varchar(96),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pandalImageDiscoveryStates_id` PRIMARY KEY(`id`),
	CONSTRAINT `pandal_image_discovery_record_idx` UNIQUE(`recordId`)
);
--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` MODIFY COLUMN `status` enum('discovered','candidate','matched','needs_review','license_unknown','approved','published','rejected','broken','removed','unmatched') NOT NULL DEFAULT 'needs_review';--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `sourceDomain` varchar(180);--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `sourceTier` enum('official','open_repository','discovery_reference','search_discovery','other') DEFAULT 'open_repository' NOT NULL;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `discoveredFrom` varchar(96) DEFAULT 'dataset_import' NOT NULL;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `importBatchId` varchar(96) DEFAULT 'legacy' NOT NULL;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `licenseUrl` text;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `usageStatus` enum('unknown','license_verified','approved_for_publication','restricted','broken','removed') DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `capturedYear` int;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `yearConfidence` enum('verified','source_stated','inferred','unknown') DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `contentType` varchar(96);--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `width` int;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `height` int;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `byteSize` int;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `technicalQualityScore` int;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `qualityNote` text;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `sha256` varchar(96);--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `perceptualHash` varchar(96);--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `duplicateGroup` varchar(96);--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `validationNote` text;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `lastValidatedAt` timestamp;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `publishedAt` timestamp;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `removedAt` timestamp;--> statement-breakpoint
CREATE INDEX `pandal_image_discovery_status_idx` ON `pandalImageDiscoveryStates` (`status`);--> statement-breakpoint
CREATE INDEX `pandal_image_candidates_batch_idx` ON `pandalImageCandidates` (`importBatchId`);--> statement-breakpoint
CREATE INDEX `pandal_image_candidates_source_idx` ON `pandalImageCandidates` (`source`);--> statement-breakpoint
CREATE INDEX `pandal_image_candidates_year_idx` ON `pandalImageCandidates` (`capturedYear`);--> statement-breakpoint
CREATE INDEX `pandal_image_candidates_quality_idx` ON `pandalImageCandidates` (`technicalQualityScore`);