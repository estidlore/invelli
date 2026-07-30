import type { Table } from "drizzle-orm";
import type { SQLiteSelectBase } from "drizzle-orm/sqlite-core";
import type { SQLiteSyncRelationalQuery } from "drizzle-orm/sqlite-core/query-builders/query";
import type { SQLiteRunResult } from "expo-sqlite";

import type { Item, Transaction, TransactionItem } from "@/db/schema";

type SelectQuery<T extends Table> = SQLiteSelectBase<
  T["_"]["name"],
  "sync",
  SQLiteRunResult,
  T["_"]["columns"]
>;

type FindFirstQuery<
  Base,
  Detailed extends Base,
  IsDetailed extends boolean,
> = SQLiteSyncRelationalQuery<IsDetailed extends true ? Detailed : Base>;

type FindManyQuery<
  Base,
  Detailed extends Base,
  IsDetailed extends boolean,
> = SQLiteSyncRelationalQuery<(IsDetailed extends true ? Detailed : Base)[]>;

interface DetailedTransactionItem extends TransactionItem {
  item: Item;
}

interface DetailedTransaction extends Transaction {
  transactionItems: DetailedTransactionItem[];
}

interface GetTransactionOptions<D extends boolean> {
  id: string;
  isDetailed?: D;
}

interface GetTransactionsOptions<D extends boolean> {
  isDetailed?: D;
}

interface GetTransactionItemOptions<D extends boolean> {
  id: string;
  isDetailed?: D;
}

interface GetTransactionItemsOptions<D extends boolean> {
  isDetailed?: D;
  transactionId?: string;
}

export type {
  DetailedTransaction,
  DetailedTransactionItem,
  FindFirstQuery,
  FindManyQuery,
  GetTransactionOptions,
  GetTransactionsOptions,
  GetTransactionItemOptions,
  GetTransactionItemsOptions,
  SelectQuery,
};
