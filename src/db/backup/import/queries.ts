import { sql } from "drizzle-orm";

import type { BackupPayload } from "@/db/backup/types";
import { db } from "@/db/config";
import { items, transactionItems, transactions } from "@/db/schema";

const insertBackup = async (data: BackupPayload): Promise<void> => {
  await db.transaction(async (tx) => {
    if (data.items.length > 0) {
      await tx
        .insert(items)
        .values(data.items)
        .onConflictDoUpdate({
          set: {
            buyPrice: sql`excluded.buy_price`,
            code: sql`excluded.code`,
            createdAt: sql`excluded.created_at`,
            name: sql`excluded.name`,
            quantity: sql`excluded.quantity`,
            sellPrice: sql`excluded.sell_price`,
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
            reason: sql`excluded.reason`,
            status: sql`excluded.status`,
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
            buyPrice: sql`excluded.buy_price`,
            itemId: sql`excluded.item_id`,
            quantity: sql`excluded.quantity`,
            sellPrice: sql`excluded.sell_price`,
            transactionId: sql`excluded.transaction_id`,
          },
          target: transactionItems.id,
        });
    }
  });
};

export { insertBackup };
