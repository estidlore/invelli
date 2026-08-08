import { and, between, eq, gte, sql } from "drizzle-orm";
import { randomUUID } from "expo-crypto";
import type { SQLiteRunResult } from "expo-sqlite";

import { db } from "@/db/config";
import { TX_TYPE_BY_REASON } from "@/db/constants";
import type { NewTransaction, Transaction } from "@/db/schema";
import { items, transactions } from "@/db/schema";
import { endOfDay, startOfDay } from "@/utils";

import type {
  DetailedTransaction,
  FindFirstQuery,
  FindManyQuery,
  GetTransactionOptions,
  GetTransactionsOptions,
} from "./types";

const TRANSACTION_DETAILS = {
  transactionItems: {
    with: {
      item: true,
    },
  },
} as const;

const completeTransaction = async (id: string): Promise<void> => {
  const where = eq(transactions.id, id);

  await db.transaction(async (tx) => {
    const transaction = await tx.query.transactions.findFirst({
      where,
      with: TRANSACTION_DETAILS,
    });
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    if (transaction.status !== "DRAFT") {
      throw new Error("Transaction is not a draft");
    }
    const isOutTx = transaction.type === "OUT";

    for (const txItem of transaction.transactionItems) {
      const eqId = eq(items.id, txItem.itemId);
      const res = await tx
        .update(items)
        .set({
          quantity: isOutTx
            ? sql`${items.quantity} - ${txItem.quantity}`
            : sql`${items.quantity} + ${txItem.quantity}`,
        })
        .where(isOutTx ? and(eqId, gte(items.quantity, txItem.quantity)) : eqId)
        .returning({ updatedId: items.id });

      if (isOutTx && res.length === 0) {
        throw new Error(`Insufficient stock for item: ${txItem.itemId}`);
      }
    }

    await tx.update(transactions).set({ status: "COMPLETE" }).where(where);
  });
};

const deleteTransaction = async (id: string): Promise<SQLiteRunResult> => {
  return await db.delete(transactions).where(eq(transactions.id, id));
};

const getTransaction = <D extends boolean = false>(
  options: GetTransactionOptions<D>,
): FindFirstQuery<Transaction, DetailedTransaction, D> => {
  const { id, isDetailed } = options;
  return db.query.transactions.findFirst({
    where: id ? eq(transactions.id, id) : undefined,
    with: isDetailed ? TRANSACTION_DETAILS : undefined,
  }) as FindFirstQuery<Transaction, DetailedTransaction, D>;
};

const getTransactions = <D extends boolean = false>(
  options: GetTransactionsOptions<D> = {},
): FindManyQuery<Transaction, DetailedTransaction, D> => {
  const { endDate, isDetailed, startDate } = options;
  return db.query.transactions.findMany({
    where:
      startDate === undefined || endDate === undefined
        ? undefined
        : between(
            transactions.createdAt,
            startOfDay(startDate).toISOString(),
            endOfDay(endDate).toISOString(),
          ),
    with: isDetailed ? TRANSACTION_DETAILS : undefined,
  }) as FindManyQuery<Transaction, DetailedTransaction, D>;
};

const insertTransactionDraft = async (
  reason: NewTransaction["reason"] = "SALE",
): Promise<string> => {
  const id = randomUUID();
  await db.insert(transactions).values({
    id,
    reason,
    status: "DRAFT",
    type: TX_TYPE_BY_REASON[reason],
  });
  return id;
};

const updateTransaction = async (
  id: string,
  data: Partial<NewTransaction>,
): Promise<SQLiteRunResult> => {
  return await db.update(transactions).set(data).where(eq(transactions.id, id));
};

const voidTransaction = async (id: string): Promise<void> => {
  const where = eq(transactions.id, id);

  await db.transaction(async (tx) => {
    const transaction = await tx.query.transactions.findFirst({
      where,
      with: TRANSACTION_DETAILS,
    });
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    if (transaction.status !== "COMPLETE") {
      throw new Error("Transaction is not complete");
    }

    for (const txItem of transaction.transactionItems) {
      await tx
        .update(items)
        .set({
          quantity:
            transaction.type === "IN"
              ? sql`${items.quantity} - ${txItem.quantity}`
              : sql`${items.quantity} + ${txItem.quantity}`,
        })
        .where(eq(items.id, txItem.itemId));
    }

    await tx.update(transactions).set({ status: "VOID" }).where(where);
  });
};

export {
  completeTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  insertTransactionDraft,
  updateTransaction,
  voidTransaction,
};
