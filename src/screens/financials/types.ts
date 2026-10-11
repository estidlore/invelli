import type { Transaction } from "@/db";

type TransactionsSummary = Record<
  Transaction["reason"],
  Record<"buyTotal" | "quantity" | "sellTotal", number>
>;

interface ItemsSummary {
  buyTotal: number;
  quantityTotal: number;
  sellTotal: number;
  uniqueItems: number;
}

export type { ItemsSummary, TransactionsSummary };
