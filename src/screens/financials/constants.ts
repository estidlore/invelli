import { TX_REASONS } from "@/db";
import type { DateUnit } from "@/utils";

import type { ItemsSummary, TransactionsSummary } from "./types";

const dateRangeOptions: DateUnit[] = ["day", "week", "month"];

const itemsSummaryFallback: ItemsSummary = {
  buyTotal: 0,
  quantityTotal: 0,
  sellTotal: 0,
  uniqueItems: 0,
};

const txSummaryFallback = Object.fromEntries(
  TX_REASONS.map((el) => [el, { buyTotal: 0, quantity: 0, sellTotal: 0 }]),
) as TransactionsSummary;

export { dateRangeOptions, itemsSummaryFallback, txSummaryFallback };
