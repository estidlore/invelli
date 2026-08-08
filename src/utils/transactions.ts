import type { Transaction } from "@/db";

const hasEnoughStock = (
  tx?: Pick<Transaction, "status" | "type">,
  txItems: { quantity: number; stock: number }[] = [],
): boolean => {
  if (tx?.status !== "DRAFT" || tx?.type !== "OUT") {
    return true;
  }

  return txItems.every((el) => el.quantity <= el.stock);
};

export { hasEnoughStock };
