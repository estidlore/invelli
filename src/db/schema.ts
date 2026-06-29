import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { nowISO } from "@/utils";

const items = sqliteTable("items", {
  buyPrice: integer("buy_price").notNull(),
  createdAt: text("created_at").$defaultFn(nowISO).notNull(),
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull().default(0),
  sellPrice: integer("sell_price").notNull(),
  sku: text("sku").unique(),
  updatedAt: text("updated_at").$defaultFn(nowISO).$onUpdateFn(nowISO).notNull(),
});

const transactions = sqliteTable("transactions", {
  createdAt: text("created_at").$defaultFn(nowISO).notNull(),
  id: text("id").primaryKey(),
  notes: text("notes"),
  reason: text("reason")
    .$type<
      "DAMAGE" | "FOUND" | "MISSING" | "PURCHASE_RETURN" | "PURCHASE" | "SALE_RETURN" | "SALE"
    >()
    .notNull(),
  type: text("type").$type<"IN" | "OUT">().notNull(),
  updatedAt: text("updated_at").$defaultFn(nowISO).$onUpdateFn(nowISO).notNull(),
});

const transactionItems = sqliteTable("transaction_items", {
  buyPrice: integer("buy_price"),
  createdAt: text("created_at").$defaultFn(nowISO).notNull(),
  id: text("id").primaryKey(),
  itemId: text("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "restrict" }),
  quantity: integer("quantity").notNull(),
  sellPrice: integer("sell_price"),
  transactionId: text("transaction_id")
    .notNull()
    .references(() => transactions.id, { onDelete: "cascade" }),
  updatedAt: text("updated_at").$defaultFn(nowISO).$onUpdateFn(nowISO).notNull(),
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
