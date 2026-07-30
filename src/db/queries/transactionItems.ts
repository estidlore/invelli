import { eq } from "drizzle-orm";

import { db } from "@/db/config";
import type { TransactionItem } from "@/db/schema";
import { transactionItems } from "@/db/schema";

import type { DetailedTransactionItem, FindManyQuery, GetTransactionItemsOptions } from "./types";

const TRANSACTION_ITEM_DETAILS = { item: true } as const;

const getTransactionItems = <D extends boolean = false>(
  options: GetTransactionItemsOptions<D> = {},
): FindManyQuery<TransactionItem, DetailedTransactionItem, D> => {
  const { isDetailed, transactionId } = options;
  return db.query.transactionItems.findMany({
    where: transactionId ? eq(transactionItems.transactionId, transactionId) : undefined,
    with: isDetailed ? TRANSACTION_ITEM_DETAILS : undefined,
  }) as FindManyQuery<TransactionItem, DetailedTransactionItem, D>;
};

export { getTransactionItems };
