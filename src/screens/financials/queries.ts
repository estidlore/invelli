import { and, eq, gte, lte, sql } from "drizzle-orm";

import { db, transactionItems, transactions } from "@/db";
import type { DateUnit } from "@/utils";
import { DATETIME_UNIT } from "@/utils";

import { txSummaryFallback } from "./constants";
import type { TransactionsSummary } from "./types";

const getTransactionsSummaryByReason = async (
  dateRange: DateUnit,
): Promise<TransactionsSummary> => {
  const now = new Date().toISOString();
  const startDate = new Date(Date.now() - DATETIME_UNIT[dateRange]).toISOString();

  const rows = await db
    .select({
      buyTotal: sql`
        COALESCE(
          SUM(${transactionItems.buyPrice} * ${transactionItems.quantity}),
          0
        )
      `,
      quantity: sql`COALESCE(SUM(${transactionItems.quantity}), 0)`,
      reason: transactions.reason,
      sellTotal: sql`
        COALESCE(
          SUM(
            CASE
              WHEN ${transactions.reason} IN ('SALE', 'SALE_RETURN') 
                THEN ${transactionItems.sellPrice} * ${transactionItems.quantity}
              ELSE 0
            END
          ),
          0
        )
    `,
    })
    .from(transactionItems)
    .innerJoin(
      transactions,
      and(
        eq(transactionItems.transactionId, transactions.id),
        eq(transactions.status, "COMPLETE"),
        gte(transactions.updatedAt, startDate),
        lte(transactions.updatedAt, now),
      ),
    )
    .groupBy(transactions.reason);

  const summary = Object.fromEntries(rows.map((el) => [el.reason, el]));
  return Object.assign(txSummaryFallback, summary);
};

export { getTransactionsSummaryByReason };
