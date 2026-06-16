import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { nowISO } from "@/utils";

const items = sqliteTable("items", {
  costPrice: integer("cost_price").notNull().default(0),
  createdAt: text("created_at").$defaultFn(nowISO).notNull(),
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull().default(0),
  sellPrice: integer("sell_price").notNull().default(0),
  sku: text("sku").unique(),
  updatedAt: text("updated_at").$defaultFn(nowISO).notNull(),
});

const transactions = sqliteTable("transactions", {
  createdAt: text("created_at").$defaultFn(nowISO).notNull(),
  id: text("id").primaryKey(),
  notes: text("notes"),
  type: text("type").$type<"adjustment" | "purchase" | "sale">().notNull(),
  updatedAt: text("updated_at").$defaultFn(nowISO).notNull(),
});

const transactionItems = sqliteTable("transaction_items", {
  costPrice: integer("cost_price").notNull(),
  id: text("id").primaryKey(),
  itemId: text("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "restrict" }),
  quantityDelta: integer("quantity_delta").notNull(),
  sellPrice: integer("sell_price").notNull(),
  transactionId: text("transaction_id")
    .notNull()
    .references(() => transactions.id, { onDelete: "cascade" }),
  updatedAt: text("updated_at").$defaultFn(nowISO).notNull(),
});

const itemsRelations = relations(items, ({ many }) => ({
  transactionItems: many(transactionItems),
}));

const transactionsRelations = relations(transactions, ({ many }) => ({
  transactionItems: many(transactionItems),
}));

const transactionItemsRelations = relations(transactionItems, ({ one }) => ({
  item: one(items, {
    fields: [transactionItems.itemId],
    references: [items.id],
  }),
  transaction: one(transactions, {
    fields: [transactionItems.transactionId],
    references: [transactions.id],
  }),
}));

type Item = InferSelectModel<typeof items>;
type NewItem = InferInsertModel<typeof items>;

type Transaction = InferSelectModel<typeof transactions>;
type NewTransaction = InferInsertModel<typeof transactions>;

type TransactionItem = InferSelectModel<typeof transactionItems>;
type NewTransactionItem = InferInsertModel<typeof transactionItems>;

export type { Item, NewItem, NewTransaction, NewTransactionItem, Transaction, TransactionItem };
export {
  items,
  itemsRelations,
  transactions,
  transactionsRelations,
  transactionItems,
  transactionItemsRelations,
};
