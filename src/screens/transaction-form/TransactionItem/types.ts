import type { DetailedTransactionItem, Transaction } from "@/db";

interface TransactionItemProps {
  data: DetailedTransactionItem;
  tx: Pick<Transaction, "reason" | "status" | "type">;
}

export type { TransactionItemProps };
