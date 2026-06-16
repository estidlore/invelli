import { db } from "@/db/config";
import type { Transaction } from "@/db/schema";
import { transactions } from "@/db/schema";

const getTransactions = async (): Promise<Transaction[]> => {
  return await db.select().from(transactions);
};

export { getTransactions };
