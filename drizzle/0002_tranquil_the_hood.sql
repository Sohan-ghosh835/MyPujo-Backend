CREATE TABLE `catalogueCorrections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`recordId` varchar(220),
	`issueType` enum('name','address','location','image','source','season2026','other') NOT NULL,
	`details` text NOT NULL,
	`pageUrl` varchar(512),
	`reporterContact` varchar(320),
	`status` enum('pending','reviewed','resolved','dismissed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalogueCorrections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `catalogue_corrections_record_idx` ON `catalogueCorrections` (`recordId`);--> statement-breakpoint
CREATE INDEX `catalogue_corrections_status_idx` ON `catalogueCorrections` (`status`);