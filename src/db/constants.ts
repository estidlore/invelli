import type { IconName } from "@/components";
import type { ThemeColor } from "@/core/theme";

import type { Transaction } from "./schema";

const COLOR_BY_TX_REASON: Record<Transaction["reason"], ThemeColor> = {
  DAMAGE: "textError",
  FOUND: "textSuccess",
  MISSING: "textError",
  PURCHASE: "textInfo",
  PURCHASE_RETURN: "textWarning",
  SALE: "textSuccess",
  SALE_RETURN: "textWarning",
};

const COLOR_BY_TX_STATUS: Record<Transaction["status"], ThemeColor> = {
  COMPLETE: "textSuccess",
  DRAFT: "textWarning",
  VOID: "textError",
};

const ICON_BY_TX_REASON: Record<Transaction["reason"], IconName> = {
  DAMAGE: "warning",
  FOUND: "plusSquare",
  MISSING: "minusSquare",
  PURCHASE: "arrowUp",
  PURCHASE_RETURN: "arrowDownRight",
  SALE: "arrowDown",
  SALE_RETURN: "arrowUpLeft",
};

const DEFAULT_REASON_BY_TYPE: Record<Transaction["type"], Transaction["reason"]> = {
  IN: "PURCHASE",
  OUT: "SALE",
};

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

export {
  COLOR_BY_TX_REASON,
  COLOR_BY_TX_STATUS,
  DEFAULT_REASON_BY_TYPE,
  ICON_BY_TX_REASON,
  TX_REASONS,
  TX_TYPES,
  TX_TYPE_BY_REASON,
};
