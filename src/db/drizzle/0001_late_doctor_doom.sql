CREATE TABLE `transaction_items` (
	`cost_price` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`item_id` text NOT NULL,
	`quantity_delta` integer NOT NULL,
	`sell_price` integer NOT NULL,
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
	`type` text NOT NULL,
	`updated_at` text NOT NULL
);
