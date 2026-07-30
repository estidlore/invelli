CREATE TABLE `transaction_items` (
	`buy_price` integer,
	`id` text PRIMARY KEY NOT NULL,
	`item_id` text NOT NULL,
	`quantity` real NOT NULL,
	`sell_price` integer,
	`transaction_id` text NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`created_at` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`notes` text,
	`reason` text NOT NULL,
	`status` text NOT NULL,
	`type` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_items` (
	`buy_price` integer NOT NULL,
	`code` text,
	`created_at` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`quantity` real DEFAULT 0 NOT NULL,
	`sell_price` integer NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_items`("buy_price", "code", "created_at", "id", "name", "quantity", "sell_price", "updated_at") SELECT "buy_price", "code", "created_at", "id", "name", "quantity", "sell_price", "updated_at" FROM `items`;--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
ALTER TABLE `__new_items` RENAME TO `items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;