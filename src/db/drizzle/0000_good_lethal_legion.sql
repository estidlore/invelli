CREATE TABLE `items` (
	`cost_price` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`quantity` integer DEFAULT 0 NOT NULL,
	`sell_price` integer DEFAULT 0 NOT NULL,
	`sku` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `items_sku_unique` ON `items` (`sku`);--> statement-breakpoint
CREATE TABLE `stock_logs` (
	`cost_price_at_time` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`item_id` text NOT NULL,
	`quantity_changed` integer NOT NULL,
	`sell_price_at_time` integer NOT NULL,
	`timestamp` text NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE cascade
);
