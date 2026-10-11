import type { DateUnit } from "@/utils";

import type { Metric } from "./ItemPerformance/types";

const dateRangeOptions: DateUnit[] = ["day", "week", "month"];

const sortByOptions: Metric[] = [
  "profit",
  "revenue",
  "unitsSold",
  "margin",
  "shrinkage",
  "sellPrice",
  "buyPrice",
  "stock",
];

const isTxMetric: Record<Metric, boolean> = {
  buyPrice: false,
  margin: false,
  profit: true,
  revenue: true,
  sellPrice: false,
  shrinkage: true,
  stock: false,
  unitsSold: true,
};

export { dateRangeOptions, isTxMetric, sortByOptions };
