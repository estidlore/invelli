ALTER TABLE `items` RENAME COLUMN "cost_price" TO "buy_price";--> statement-breakpoint
CREATE TABLE `transaction_items` (
	`buy_price` integer,
	`created_at` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`item_id` text NOT NULL,
	`quantity` integer NOT NULL,
	`sell_price` integer,
	`transaction_id` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`created_at` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`notes` text,
	`reason` text NOT NULL,
	`type` text NOT NULL,
	`updated_at` text NOT NULL
);
