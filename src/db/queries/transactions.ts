import { and, desc, eq, sql } from "drizzle-orm";
import type { SQLiteSyncRelationalQuery } from "drizzle-orm/sqlite-core/query-builders/query";
import { randomUUID } from "expo-crypto";
import type { SQLiteRunResult } from "expo-sqlite";

import { db } from "@/db/config";
import type {
  Item,
  NewTransaction,
  NewTransactionItem,
  Transaction,
  TransactionItem,
} from "@/db/schema";
import { items, transactionItems, transactions } from "@/db/schema";

import { TX_TYPE_BY_REASON } from "../constants";

interface TransactionDetailItem extends TransactionItem {
  item: Pick<Item, "name" | "sku">;
}

interface TransactionDetail extends Transaction {
  transactionItems: TransactionDetailItem[];
}

type NewTransactionDetailItem = Pick<
  NewTransactionItem,
  "buyPrice" | "id" | "itemId" | "quantity" | "sellPrice"
>;

interface NewTransactionDetail extends Pick<NewTransaction, "notes" | "reason"> {
  transactionItems: NewTransactionDetailItem[];
}

const getTransactions = async (): Promise<Transaction[]> => {
  return await db.select().from(transactions);
};

const deleteTransaction = async (id: string): Promise<SQLiteRunResult> => {
  return await db.delete(transactions).where(eq(transactions.id, id));
};

const getTransaction = async (id: string): Promise<TransactionDetail | undefined> => {
  return await db.query.transactions.findFirst({
    where: eq(transactions.id, id),
    with: {
      transactionItems: {
        with: {
          item: {
            columns: {
              name: true,
              sku: true,
            },
          },
        },
      },
    },
  });
};

const getTransactionsByDate = (
  targetDate: string,
  txType?: Transaction["type"],
): SQLiteSyncRelationalQuery<TransactionDetail[]> => {
  const dateCondition = eq(transactions.createdAt, targetDate);
  const condition =
    txType === undefined ? dateCondition : and(dateCondition, eq(transactions.type, txType));

  return db.query.transactions.findMany({
    orderBy: [desc(transactions.createdAt)],
    where: condition,
    with: {
      transactionItems: {
        with: {
          item: {
            columns: {
              name: true,
              sku: true,
            },
          },
        },
      },
    },
  });
};

const insertTransaction = async (data: NewTransactionDetail): Promise<string> => {
  const transactionId = randomUUID();

  return await db.transaction(async (tx) => {
    await tx.insert(transactions).values({
      id: randomUUID(),
      notes: data.notes,
      reason: data.reason,
      type: TX_TYPE_BY_REASON[data.reason],
    });

    for (const txItem of data.transactionItems) {
      await tx.insert(transactionItems).values({
        buyPrice: txItem.buyPrice,
        id: txItem.id,
        itemId: txItem.itemId,
        quantity: txItem.quantity,
        sellPrice: txItem.sellPrice,
        transactionId,
      });
      await tx
        .update(items)
        .set({
          quantity: sql`${items.quantity} + ${txItem.quantity}`,
        })
        .where(eq(items.id, txItem.itemId));
    }

    return transactionId;
  });
};

export type {
  NewTransactionDetail,
  NewTransactionDetailItem,
  TransactionDetail,
  TransactionDetailItem,
};
export {
  deleteTransaction,
  getTransaction,
  getTransactionsByDate,
  getTransactions,
  insertTransaction,
};
