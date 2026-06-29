import type { Transaction } from "./schema";

const TX_REASONS: Transaction["reason"][] = [
  "SALE",
  "PURCHASE",
  "SALE_RETURN",
  "PURCHASE_RETURN",
  "DAMAGE",
  "FOUND",
  "MISSING",
];

const TX_TYPES: Transaction["type"][] = ["IN", "OUT"];

const TX_TYPE_BY_REASON: Record<Transaction["reason"], Transaction["type"]> = {
  DAMAGE: "OUT",
  FOUND: "IN",
  MISSING: "OUT",
  PURCHASE: "IN",
  PURCHASE_RETURN: "OUT",
  SALE: "OUT",
  SALE_RETURN: "IN",
};

const DEFAULT_REASON_BY_TYPE: Record<Transaction["type"], Transaction["reason"]> = {
  IN: "PURCHASE",
  OUT: "SALE",
};

export { DEFAULT_REASON_BY_TYPE, TX_REASONS, TX_TYPES, TX_TYPE_BY_REASON };
