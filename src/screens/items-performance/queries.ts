import { and, asc, desc, eq, gte, lte, sql } from "drizzle-orm";

import { db, items, transactionItems, transactions } from "@/db";
import { DATETIME_UNIT } from "@/utils";

import type { ItemPerformanceProps } from "./ItemPerformance/types";
import { isStaticMetric } from "./constants";
import type {
  GetTopItemsByMetricOptions,
  GetTopItemsByTxMetricOptions,
  GetTopItemsOptions,
} from "./types";

const revenueSQL = sql`
  SUM(
    CASE 
      WHEN ${transactions.reason} = 'SALE'
        THEN ${transactionItems.sellPrice} * ${transactionItems.quantity}
      WHEN ${transactions.reason} = 'SALE_RETURN'
        THEN -${transactionItems.sellPrice} * ${transactionItems.quantity}
      ELSE 0
    END
  )
`;

const buyPriceSQL = sql`
  SUM(
    CASE 
      WHEN ${transactions.reason} = 'SALE'
        THEN ${transactionItems.buyPrice} * ${transactionItems.quantity}
      WHEN ${transactions.reason} = 'SALE_RETURN'
        THEN -${transactionItems.buyPrice} * ${transactionItems.quantity}
      ELSE 0
    END
  )
`;

const unitsSoldSQL = sql`
  SUM(
    CASE 
      WHEN ${transactions.reason} = 'SALE'
        THEN ${transactionItems.quantity}
      WHEN ${transactions.reason} = 'SALE_RETURN'
        THEN -${transactionItems.quantity}
      ELSE 0
    END
  )
`;

const profitSQL = sql`(${revenueSQL} - ${buyPriceSQL})`;

const shrinkageSQL = sql`
  SUM(
    CASE 
      WHEN ${transactions.reason} IN ('MISSING', 'DAMAGE')
        THEN ${transactionItems.buyPrice} * ${transactionItems.quantity}
      ELSE 0
    END
  )
`;

const getTopItemsByMetric = async ({
  limit = 20,
  metric,
  sortDirection = "desc",
}: GetTopItemsByMetricOptions): Promise<ItemPerformanceProps[]> => {
  const sortExpr = {
    buyPrice: items.buyPrice,
    margin: sql`1.0 * (${items.sellPrice} - ${items.buyPrice}) / ${items.sellPrice}`,
    sellPrice: items.sellPrice,
    stock: sql`(${items.buyPrice} * ${items.quantity})`,
  }[metric];
  const orderByExpr = sortDirection === "asc" ? asc(sortExpr) : desc(sortExpr);

  const results = await db
    .select({
      item: items,
      rank: sql`RANK() OVER (ORDER BY ${orderByExpr})`.mapWith(Number),
      value: sql`COALESCE(${sortExpr}, 0)`.mapWith(Number),
    })
    .from(items)
    .orderBy(orderByExpr)
    .limit(limit);

  return results.map((el) => ({ ...el.item, metric, rank: el.rank, value: el.value }));
};

const getTopItemsByTxMetric = async ({
  dateRange,
  limit = 20,
  metric,
  sortDirection = "desc",
}: GetTopItemsByTxMetricOptions): Promise<ItemPerformanceProps[]> => {
  const now = new Date().toISOString();
  const startDate = new Date(Date.now() - DATETIME_UNIT[dateRange]).toISOString();

  const sortExpr = {
    profit: profitSQL,
    revenue: revenueSQL,
    shrinkage: shrinkageSQL,
    unitsSold: unitsSoldSQL,
  }[metric];
  const orderByExpr = sortDirection === "asc" ? asc(sortExpr) : desc(sortExpr);

  const results = await db
    .select({
      item: items,
      rank: sql`RANK() OVER (ORDER BY ${orderByExpr})`.mapWith(Number),
      value: sql`COALESCE(${sortExpr}, 0)`.mapWith(Number),
    })
    .from(items)
    .leftJoin(transactionItems, eq(items.id, transactionItems.itemId))
    .leftJoin(
      transactions,
      and(
        eq(transactionItems.transactionId, transactions.id),
        eq(transactions.status, "COMPLETE"),
        gte(transactions.updatedAt, startDate),
        lte(transactions.updatedAt, now),
      ),
    )
    .groupBy(items.id)
    .orderBy(orderByExpr)
    .limit(limit);

  return results.map((el) => ({ ...el.item, metric, rank: el.rank, value: el.value }));
};

const getTopItems = async (options: GetTopItemsOptions): Promise<ItemPerformanceProps[]> => {
  if (isStaticMetric[options.metric]) {
    return getTopItemsByMetric(options as GetTopItemsByMetricOptions);
  }

  return getTopItemsByTxMetric(options as GetTopItemsByTxMetricOptions);
};

export { getTopItems };
