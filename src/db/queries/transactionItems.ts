import { db } from "@/db/config";
import type { TransactionItem } from "@/db/schema";
import { transactionItems } from "@/db/schema";

const getTransactionItems = async (): Promise<TransactionItem[]> => {
  return await db.select().from(transactionItems);
};

export { getTransactionItems };
