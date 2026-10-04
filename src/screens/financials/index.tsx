import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView } from "react-native";

import { Card, Screen, SegmentedControl } from "@/components";
import { useTranslation } from "@/core/language";
import { TX_REASONS } from "@/db";
import type { DateUnit } from "@/utils";
import { isSaleRelated } from "@/utils";

import { KPI } from "./KPI";
import { dateRangeOptions, txSummaryFallback } from "./constants";
import { getTransactionsSummaryByReason } from "./queries";
import { styles } from "./styles";
import { translations } from "./translations";

const FinancialsScreen = (): React.JSX.Element => {
  const [dateRange, setDateRange] = useState<DateUnit>("month");

  const { data: txSummary = txSummaryFallback } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: async () => getTransactionsSummaryByReason(dateRange),
    queryKey: ["txSummary", dateRange],
    staleTime: 60 * 1000, // 1 min
  });

  const t = useTranslation(translations);

  const netRevenue = txSummary.SALE.sellTotal - txSummary.SALE_RETURN.sellTotal;
  const netCOGS = txSummary.SALE.buyTotal - txSummary.SALE_RETURN.buyTotal;
  const grossProfit = netRevenue - netCOGS;

  const netInventoryProfit =
    txSummary.FOUND.buyTotal - txSummary.MISSING.buyTotal - txSummary.DAMAGE.buyTotal;
  const netProfit = grossProfit + netInventoryProfit;

  return (
    <Screen title={t.title}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SegmentedControl
          onChange={setDateRange}
          options={dateRangeOptions.map((el) => ({
            text: t.dateRange[el],
            value: el,
          }))}
          value={dateRange}
        />

        <Card style={styles.card}>
          <KPI label={t.netRevenue} value={netRevenue} />
          <KPI label={t.netCOGS} value={netCOGS} />
          <KPI label={t.grossProfit} value={grossProfit} />
          <KPI label={t.netInventoryProfit} value={netInventoryProfit} />
          <KPI label={t.netProfit} value={netProfit} />
        </Card>

        <Card style={styles.card}>
          {TX_REASONS.map((txReason) => (
            <KPI
              key={txReason}
              label={t.txReasonMap[txReason]}
              value={txSummary[txReason][isSaleRelated(txReason) ? "sellTotal" : "buyTotal"]}
            />
          ))}
        </Card>
      </ScrollView>
    </Screen>
  );
};

export { FinancialsScreen };
