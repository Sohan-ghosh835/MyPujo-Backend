ALTER TABLE `pandalImageCandidates` ADD `visualMatchConfidence` int;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `managedAssetUrl` text;--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `managedAssetKey` varchar(512);--> statement-breakpoint
ALTER TABLE `pandalImageCandidates` ADD `assetAttachedAt` timestamp;