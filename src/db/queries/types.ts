import type { Table } from "drizzle-orm";
import type { SQLiteSelectBase } from "drizzle-orm/sqlite-core";
import type { SQLiteRunResult } from "expo-sqlite";

import type { NewItem, NewTransaction, NewTransactionItem } from "@/db/schema";

type SelectQuery<T extends Table> = SQLiteSelectBase<
  T["_"]["name"],
  "sync",
  SQLiteRunResult,
  T["_"]["columns"]
>;

interface InsertBackupData {
  items: NewItem[];
  transactionItems: NewTransactionItem[];
  transactions: NewTransaction[];
}

export type { InsertBackupData, SelectQuery };
