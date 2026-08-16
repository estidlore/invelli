CREATE UNIQUE INDEX `uidx_items__code` ON `items` (`code`);--> statement-breakpoint
CREATE INDEX `idx_items__name` ON `items` (`name`);--> statement-breakpoint
CREATE INDEX `idx_items__updated` ON `items` (`updated_at`);--> statement-breakpoint
CREATE INDEX `idx_tx_items__item_tx` ON `transaction_items` (`item_id`,`transaction_id`);--> statement-breakpoint
CREATE INDEX `idx_tx_items__tx` ON `transaction_items` (`transaction_id`);--> statement-breakpoint
CREATE INDEX `idx_tx__reason_status_updated` ON `transactions` (`reason`,`status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `idx_tx__updated` ON `transactions` (`updated_at`);