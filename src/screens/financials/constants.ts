import { TX_REASONS } from "@/db";
import type { DateUnit } from "@/utils";

import type { TransactionsSummary } from "./types";

const dateRangeOptions: DateUnit[] = ["day", "week", "month"];

const txSummaryFallback = Object.fromEntries(
  TX_REASONS.map((el) => [el, { buyTotal: 0, quantity: 0, sellTotal: 0 }]),
) as TransactionsSummary;

export { dateRangeOptions, txSummaryFallback };
