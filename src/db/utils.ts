import { round } from "litus";

import type { NewItem, NewTransactionItem } from "./schema";

const sanitizeDbItem = <T extends Partial<NewItem>>(item: T): T => {
  const code = item.code?.trim();
  return {
    ...item,
    code: code === "" ? null : code,
    name: item.name?.trim(),
    quantity: typeof item.quantity === "number" ? round(item.quantity, 3) : undefined,
  };
};

const sanitizeDbTxItem = <T extends Partial<NewTransactionItem>>(txItem: T): T => {
  return {
    ...txItem,
    quantity: typeof txItem.quantity === "number" ? round(txItem.quantity, 3) : undefined,
  };
};

export { sanitizeDbItem, sanitizeDbTxItem };
