import type { DateUnit } from "@/utils";

import type { ItemMetric, ItemTxMetric, Metric } from "./ItemPerformance/types";

interface GetTopItemsBaseOptions {
  limit?: number;
  sortDirection?: "asc" | "desc";
}

interface GetTopItemsByMetricOptions extends GetTopItemsBaseOptions {
  metric: ItemMetric;
}

interface GetTopItemsByTxMetricOptions extends GetTopItemsBaseOptions {
  dateRange: DateUnit;
  metric: ItemTxMetric;
}

interface GetTopItemsOptions extends GetTopItemsBaseOptions {
  dateRange: DateUnit;
  metric: Metric;
}

export type { GetTopItemsByMetricOptions, GetTopItemsByTxMetricOptions, GetTopItemsOptions };
