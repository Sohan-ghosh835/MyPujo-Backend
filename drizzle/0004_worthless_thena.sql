CREATE TABLE `pandalImageCandidates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`candidateId` varchar(96) NOT NULL,
	`recordId` varchar(220) NOT NULL,
	`imageUrl` text NOT NULL,
	`sourcePage` text NOT NULL,
	`source` varchar(80) NOT NULL,
	`originalFilename` text NOT NULL,
	`inferredName` text NOT NULL,
	`matchMethod` varchar(96) NOT NULL,
	`matchConfidence` int NOT NULL,
	`license` varchar(160),
	`attribution` text,
	`status` enum('needs_review','approved','rejected','unmatched') NOT NULL DEFAULT 'needs_review',
	`reviewerId` int,
	`reviewNote` text,
	`reviewedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pandalImageCandidates_id` PRIMARY KEY(`id`),
	CONSTRAINT `pandal_image_candidates_candidate_idx` UNIQUE(`candidateId`)
);
--> statement-breakpoint
CREATE INDEX `pandal_image_candidates_record_idx` ON `pandalImageCandidates` (`recordId`);--> statement-breakpoint
CREATE INDEX `pandal_image_candidates_status_idx` ON `pandalImageCandidates` (`status`);