import type { DetailedTransactionItem, Transaction } from "@/db";

interface TransactionActionsProps {
  showReceipt: boolean;
  toggleReceipt: () => void;
  tx: Transaction;
  txItems: DetailedTransactionItem[];
}

export type { TransactionActionsProps };
