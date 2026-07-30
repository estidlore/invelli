import { db } from "@/db/config";
import type { Transaction } from "@/db/schema";

import type { DetailedTransaction, FindManyQuery, GetTransactionsOptions } from "./types";

const TRANSACTION_DETAILS = {
  transactionItems: {
    with: {
      item: true,
    },
  },
} as const;

const getTransactions = <D extends boolean = false>(
  options: GetTransactionsOptions<D> = {},
): FindManyQuery<Transaction, DetailedTransaction, D> => {
  const { isDetailed } = options;
  return db.query.transactions.findMany({
    with: isDetailed ? TRANSACTION_DETAILS : undefined,
  }) as FindManyQuery<Transaction, DetailedTransaction, D>;
};

export { getTransactions };
