import type { Transaction } from "@/db";

type TransactionsSummary = Record<
  Transaction["reason"],
  Record<"buyTotal" | "quantity" | "sellTotal", number>
>;

export type { TransactionsSummary };
