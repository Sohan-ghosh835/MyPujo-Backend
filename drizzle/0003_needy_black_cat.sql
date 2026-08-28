CREATE TABLE `coordinateCandidates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recordId` varchar(220) NOT NULL,
	`latitudeE6` int NOT NULL,
	`longitudeE6` int NOT NULL,
	`source` varchar(80) NOT NULL,
	`sourceUrl` text NOT NULL,
	`query` text NOT NULL,
	`displayName` text NOT NULL,
	`osmType` varchar(24),
	`osmId` varchar(48),
	`confidence` enum('medium','low','unverified') NOT NULL DEFAULT 'unverified',
	`status` enum('candidate','approved','rejected','unresolved') NOT NULL DEFAULT 'candidate',
	`verificationMethod` varchar(80) NOT NULL DEFAULT 'nominatim-candidate',
	`reviewerId` int,
	`reviewNote` text,
	`retrievedAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coordinateCandidates_id` PRIMARY KEY(`id`),
	CONSTRAINT `coordinate_candidates_record_idx` UNIQUE(`recordId`)
);
--> statement-breakpoint
CREATE INDEX `coordinate_candidates_status_idx` ON `coordinateCandidates` (`status`);