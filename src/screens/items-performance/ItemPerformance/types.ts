import type { Item } from "@/db";

type ItemMetric = "buyPrice" | "margin" | "sellPrice";

type ItemTxMetric = "profit" | "revenue" | "shrinkage" | "unitsSold";

type Metric = ItemMetric | ItemTxMetric;

interface ItemPerformanceProps extends Item {
  metric: Metric;
  rank: number;
  value: number;
}

export type { ItemMetric, ItemPerformanceProps, ItemTxMetric, Metric };
