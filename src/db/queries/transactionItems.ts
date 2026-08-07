import { eq, sql } from "drizzle-orm";
import { randomUUID } from "expo-crypto";
import type { SQLiteRunResult } from "expo-sqlite";

import { db } from "@/db/config";
import type { NewTransactionItem, TransactionItem } from "@/db/schema";
import { transactionItems } from "@/db/schema";
import { sanitizeDbTxItem } from "@/db/utils";

import type {
  DetailedTransactionItem,
  FindFirstQuery,
  FindManyQuery,
  GetTransactionItemOptions,
  GetTransactionItemsOptions,
} from "./types";

const TRANSACTION_ITEM_DETAILS = { item: true } as const;

const deleteTransactionItem = async (id: string): Promise<SQLiteRunResult> => {
  return await db.delete(transactionItems).where(eq(transactionItems.id, id));
};

const getTransactionItem = <D extends boolean = false>(
  options: GetTransactionItemOptions<D>,
): FindFirstQuery<TransactionItem, DetailedTransactionItem, D> => {
  const { id, isDetailed } = options;
  return db.query.transactionItems.findFirst({
    where: id ? eq(transactionItems.id, id) : undefined,
    with: isDetailed ? TRANSACTION_ITEM_DETAILS : undefined,
  }) as FindFirstQuery<TransactionItem, DetailedTransactionItem, D>;
};

const getTransactionItems = <D extends boolean = false>(
  options: GetTransactionItemsOptions<D> = {},
): FindManyQuery<TransactionItem, DetailedTransactionItem, D> => {
  const { isDetailed, transactionId } = options;
  return db.query.transactionItems.findMany({
    where: transactionId ? eq(transactionItems.transactionId, transactionId) : undefined,
    with: isDetailed ? TRANSACTION_ITEM_DETAILS : undefined,
  }) as FindManyQuery<TransactionItem, DetailedTransactionItem, D>;
};

const incrementTransactionItem = async (id: string): Promise<void> => {
  await db
    .update(transactionItems)
    .set({ quantity: sql`${transactionItems.quantity} + 1` })
    .where(eq(transactionItems.id, id));
};

const insertTransactionItem = async (item: Omit<NewTransactionItem, "id">): Promise<string> => {
  const id = randomUUID();
  await db.insert(transactionItems).values({ ...sanitizeDbTxItem(item), id });
  return id;
};

const updateTransactionItem = async (
  id: string,
  data: Partial<NewTransactionItem>,
): Promise<SQLiteRunResult> => {
  return await db
    .update(transactionItems)
    .set(sanitizeDbTxItem(data))
    .where(eq(transactionItems.id, id));
};

export {
  deleteTransactionItem,
  getTransactionItem,
  getTransactionItems,
  incrementTransactionItem,
  insertTransactionItem,
  updateTransactionItem,
};
