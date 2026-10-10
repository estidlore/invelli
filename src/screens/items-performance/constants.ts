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

const isStaticMetric: Record<Metric, boolean> = {
  buyPrice: true,
  margin: true,
  profit: false,
  revenue: false,
  sellPrice: true,
  shrinkage: false,
  stock: true,
  unitsSold: false,
};

export { dateRangeOptions, isStaticMetric, sortByOptions };
