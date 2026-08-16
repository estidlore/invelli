import type { Transaction, TransactionItem } from "@/db";

interface TransactionItemProps extends Pick<
  TransactionItem,
  "buyPrice" | "id" | "quantity" | "sellPrice"
> {
  transaction: Pick<Transaction, "id" | "reason" | "updatedAt">;
}

export type { TransactionItemProps };
