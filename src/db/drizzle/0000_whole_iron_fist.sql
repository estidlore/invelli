CREATE TABLE `items` (
	`cost_price` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`quantity` integer DEFAULT 0 NOT NULL,
	`sell_price` integer DEFAULT 0 NOT NULL,
	`sku` text,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `items_sku_unique` ON `items` (`sku`);