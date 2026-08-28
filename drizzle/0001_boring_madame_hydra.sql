CREATE TABLE `crowdReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pandalId` int NOT NULL,
	`seasonId` int NOT NULL,
	`userId` int,
	`crowdLevel` enum('low','moderate','high','very_high','extreme') NOT NULL,
	`queueBand` enum('none','under_10','ten_to_30','thirty_to_60','over_60') NOT NULL,
	`status` enum('pending','approved','hidden') NOT NULL DEFAULT 'pending',
	`reportedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `crowdReports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pandalSeasonData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pandalId` int NOT NULL,
	`seasonId` int NOT NULL,
	`theme` text,
	`popularityScore` int,
	`overallRatingTenths` int,
	`artisticScore` int,
	`traditionalScore` int,
	`familyScore` int,
	`crowdLevel` enum('unavailable','low','moderate','high','very_high','extreme') NOT NULL DEFAULT 'unavailable',
	`estimatedVisitMinutes` int,
	`estimatedWaitMinutes` int,
	`openingTime` varchar(8),
	`closingTime` varchar(8),
	`metroStations` json,
	`verificationStatus` enum('verified','partial','unverified','inactive','development') NOT NULL DEFAULT 'unverified',
	`sourceName` varchar(180),
	`sourceUrl` text,
	`verifiedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pandalSeasonData_id` PRIMARY KEY(`id`),
	CONSTRAINT `pandalSeasonData_pandal_season_idx` UNIQUE(`pandalId`,`seasonId`)
);
--> statement-breakpoint
CREATE TABLE `pandals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`slug` varchar(220) NOT NULL,
	`section` varchar(64) NOT NULL,
	`subArea` varchar(96),
	`address` text,
	`landmark` varchar(180),
	`latitudeE6` int,
	`longitudeE6` int,
	`tags` json,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pandals_id` PRIMARY KEY(`id`),
	CONSTRAINT `pandals_slug_idx` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `pujaSeasons` (
	`id` int AUTO_INCREMENT NOT NULL,
	`year` int NOT NULL,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`label` varchar(96) NOT NULL,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pujaSeasons_id` PRIMARY KEY(`id`),
	CONSTRAINT `pujaSeasons_year_unique` UNIQUE(`year`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pandalId` int NOT NULL,
	`seasonId` int NOT NULL,
	`userId` int NOT NULL,
	`ratingTenths` int NOT NULL,
	`reviewText` text,
	`status` enum('pending','approved','hidden') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `savedRoutes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`shareToken` varchar(64) NOT NULL,
	`userId` int,
	`seasonId` int NOT NULL,
	`title` varchar(180) NOT NULL,
	`plannerInput` json NOT NULL,
	`routeResult` json NOT NULL,
	`isPublic` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `savedRoutes_id` PRIMARY KEY(`id`),
	CONSTRAINT `savedRoutes_shareToken_unique` UNIQUE(`shareToken`)
);
--> statement-breakpoint
CREATE TABLE `userPandalStates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pandalId` int NOT NULL,
	`seasonId` int NOT NULL,
	`isFavourite` boolean NOT NULL DEFAULT false,
	`visitedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userPandalStates_id` PRIMARY KEY(`id`),
	CONSTRAINT `userPandalStates_user_pandal_season_idx` UNIQUE(`userId`,`pandalId`,`seasonId`)
);
--> statement-breakpoint
CREATE INDEX `pandalSeasonData_season_idx` ON `pandalSeasonData` (`seasonId`);--> statement-breakpoint
CREATE INDEX `pandals_section_idx` ON `pandals` (`section`);--> statement-breakpoint
CREATE INDEX `pandals_name_idx` ON `pandals` (`name`);