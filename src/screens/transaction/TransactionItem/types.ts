import type { DetailedTransactionItem, Transaction } from "@/db";

interface TransactionItemProps {
  data: DetailedTransactionItem;
  tx: Pick<Transaction, "status" | "type">;
}

export type { TransactionItemProps };
