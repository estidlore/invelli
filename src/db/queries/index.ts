import { sql } from "drizzle-orm";

import { db } from "@/db/config";
import { items, transactionItems, transactions } from "@/db/schema";

import type { InsertBackupData } from "./types";

const insertBackup = async (data: InsertBackupData): Promise<void> => {
  await db.transaction(async (tx) => {
    if (data.items.length > 0) {
      await tx
        .insert(items)
        .values(data.items)
        .onConflictDoUpdate({
          set: {
            costPrice: sql`excluded.cost_price`,
            createdAt: sql`excluded.created_at`,
            name: sql`excluded.name`,
            quantity: sql`excluded.quantity`,
            sellPrice: sql`excluded.sell_price`,
            sku: sql`excluded.sku`,
            updatedAt: sql`excluded.updated_at`,
          },
          target: items.id,
        });
    }

    if (data.transactions.length > 0) {
      await tx
        .insert(transactions)
        .values(data.transactions)
        .onConflictDoUpdate({
          set: {
            createdAt: sql`excluded.created_at`,
            notes: sql`excluded.notes`,
            type: sql`excluded.type`,
            updatedAt: sql`excluded.updated_at`,
          },
          target: transactions.id,
        });
    }

    if (data.transactionItems.length > 0) {
      await tx
        .insert(transactionItems)
        .values(data.transactionItems)
        .onConflictDoUpdate({
          set: {
            costPrice: sql`excluded.cost_price`,
            itemId: sql`excluded.item_id`,
            quantityDelta: sql`excluded.quantity_delta`,
            sellPrice: sql`excluded.sell_price`,
            transactionId: sql`excluded.transaction_id`,
            updatedAt: sql`excluded.updated_at`,
          },
          target: transactionItems.id,
        });
    }
  });
};

export type * from "./types";
export * from "./items";
export * from "./transactions";
export * from "./transactionItems";
export { insertBackup };
