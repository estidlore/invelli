import type { Table } from "drizzle-orm";
import type { SQLiteSelectBase } from "drizzle-orm/sqlite-core";
import type { SQLiteRunResult } from "expo-sqlite";

type SelectQuery<T extends Table> = SQLiteSelectBase<
  T["_"]["name"],
  "sync",
  SQLiteRunResult,
  T["_"]["columns"]
>;

export type { SelectQuery };
