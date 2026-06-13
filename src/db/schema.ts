import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
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

type Item = InferSelectModel<typeof items>;
type NewItem = InferInsertModel<typeof items>;

export type { Item, NewItem };
export { items };
