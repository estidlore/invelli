import { template } from "litus";

import type { DetailedTransactionItem, Transaction } from "@/db";
import { useBusinessStore } from "@/screens/settings/Business";
import { NUM_FORMATS, dateTimeString } from "@/utils";

const generateTextReceipt = (
  tx: Transaction,
  txItems: DetailedTransactionItem[],
  t: Record<"footer" | "notes" | "poweredBy" | "return" | "sale" | "total", string>,
): string => {
  if (tx.reason !== "SALE" && tx.reason !== "SALE_RETURN") {
    throw new Error(`Receipt for ${tx.reason} transaction not supported`);
  }

  const businessInfo = useBusinessStore.getState().info;
  const line = " - - - - - - - - - - - - - - - -\n";

  let text = "";
  text += `${(tx.reason === "SALE" ? t.sale : t.return).toUpperCase()}\n`;
  text += `${dateTimeString(new Date(tx.createdAt))}\n\n`;
  text += `${businessInfo.name}\n`;
  if (businessInfo.taxId) {
    text += `${businessInfo.taxId}\n`;
  }
  if (businessInfo.address) {
    text += `${businessInfo.address}\n`;
  }
  if (businessInfo.phone) {
    text += `${businessInfo.phone}\n`;
  }
  text += "\n";

  let total = 0;
  for (const { item, quantity, sellPrice } of txItems) {
    if (!sellPrice) {
      throw new Error("Item price not set");
    }
    const itemTotal = quantity * sellPrice;
    total += itemTotal;

    const qty = NUM_FORMATS.QUANTITY.format(quantity);
    text += `${qty}x ${item.name} ${NUM_FORMATS.PRICE.format(itemTotal)}\n`;
  }

  text += line;
  text += `${t.total.toUpperCase()}:  ${NUM_FORMATS.PRICE.format(total)}\n\n`;
  if (tx.notes) {
    text += `${t.notes}: ${tx.notes}\n\n`;
  }
  text += `${t.footer}\n\n`;
  text += line;
  text += `${template(t.poweredBy, { appName: "Invelli " })}`;

  return text;
};

export { generateTextReceipt };
