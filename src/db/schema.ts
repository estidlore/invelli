import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const items = sqliteTable("items", {
  costPrice: integer("cost_price").notNull().default(0),
  createdAt: text("created_at").notNull(),
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull().default(0),
  sellPrice: integer("sell_price").notNull().default(0),
  sku: text("sku").notNull().unique(),
  updatedAt: text("updated_at").notNull(),
});

const stockLogs = sqliteTable("stock_logs", {
  costPriceAtTime: integer("cost_price_at_time").notNull(),
  id: text("id").primaryKey(),
  itemId: text("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  quantityChanged: integer("quantity_changed").notNull(),
  sellPriceAtTime: integer("sell_price_at_time").notNull(),
  timestamp: text("timestamp").notNull(),
  type: text("type").$type<"adjustment" | "restock" | "sale">().notNull(),
});

const itemsRelations = relations(items, ({ many }) => ({
  logs: many(stockLogs),
}));

const stockLogsRelations = relations(stockLogs, ({ one }) => ({
  item: one(items, { fields: [stockLogs.itemId], references: [items.id] }),
}));

type Item = InferSelectModel<typeof items>;
type NewItem = InferInsertModel<typeof items>;

type StockLog = InferSelectModel<typeof stockLogs>;
type NewStockLog = InferInsertModel<typeof stockLogs>;

export type { Item, NewItem, NewStockLog, StockLog };
export { items, itemsRelations, stockLogs, stockLogsRelations };
