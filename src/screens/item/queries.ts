/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";

import { db, transactionItems, transactions } from "@/db";

const DAY = 24 * 60 * 60 * 1000;

const getItemLast30DaysLosses = async (
  itemId: string,
): Promise<{
  losses: number;
  quantity: number;
}> => {
  const now = new Date().toISOString();
  const oneMonthAgo = new Date(Date.now() - 30 * DAY).toISOString();

  const [result] = await db
    .select({
      losses: sql<number>`
        COALESCE(
          SUM(${transactionItems.buyPrice} * ${transactionItems.quantity}),
          0
        )
      `.mapWith(Number),
      quantity: sql<number>`
        COALESCE(
          SUM(${transactionItems.quantity}),
          0
        )
      `.mapWith(Number),
    })
    .from(transactionItems)
    .innerJoin(
      transactions,
      and(
        eq(transactionItems.transactionId, transactions.id),
        eq(transactions.reason, "DAMAGE"),
        eq(transactions.status, "COMPLETE"),
      ),
    )
    .where(
      and(
        eq(transactionItems.itemId, itemId),
        gte(transactions.updatedAt, oneMonthAgo),
        lte(transactions.updatedAt, now),
      ),
    );

  return result;
};

const getItemLast30DaysSales = async (
  itemId: string,
): Promise<{
  profit: number;
  quantity: number;
  sales: number;
}> => {
  const now = new Date().toISOString();
  const oneMonthAgo = new Date(Date.now() - 30 * DAY).toISOString();

  const [result] = await db
    .select({
      profit: sql<number>`
        COALESCE(
          SUM((${transactionItems.sellPrice} - ${transactionItems.buyPrice}) * ${transactionItems.quantity}),
          0
        )
      `.mapWith(Number),
      quantity: sql<number>`
        COALESCE(
          SUM(${transactionItems.quantity}),
          0
        )
      `.mapWith(Number),
      sales: sql<number>`
        COALESCE(
          SUM(${transactionItems.sellPrice} * ${transactionItems.quantity}),
          0
        )
      `.mapWith(Number),
    })
    .from(transactionItems)
    .innerJoin(
      transactions,
      and(
        eq(transactionItems.transactionId, transactions.id),
        eq(transactions.reason, "SALE"),
        eq(transactions.status, "COMPLETE"),
      ),
    )
    .where(
      and(
        eq(transactionItems.itemId, itemId),
        gte(transactions.updatedAt, oneMonthAgo),
        lte(transactions.updatedAt, now),
      ),
    );

  return result;
};

const getItemRecentTransactions = (itemId: string) => {
  return db
    .select({
      buyPrice: transactionItems.buyPrice,
      id: transactionItems.id,
      quantity: transactionItems.quantity,
      sellPrice: transactionItems.sellPrice,
      transaction: {
        id: transactions.id,
        reason: transactions.reason,
        updatedAt: transactions.updatedAt,
      },
    })
    .from(transactionItems)
    .where(eq(transactionItems.itemId, itemId))
    .innerJoin(
      transactions,
      and(eq(transactionItems.transactionId, transactions.id), eq(transactions.status, "COMPLETE")),
    )
    .orderBy(desc(transactions.updatedAt))
    .limit(20);
};

export { getItemLast30DaysLosses, getItemLast30DaysSales, getItemRecentTransactions };
