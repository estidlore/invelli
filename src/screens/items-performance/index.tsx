import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useReducer, useState } from "react";
import { View } from "react-native";

import { Button, List, Screen, SegmentedControl, Select } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import type { DateUnit } from "@/utils";

import { ItemPerformance } from "./ItemPerformance";
import type { Metric } from "./ItemPerformance/types";
import { dateRangeOptions, isStaticMetric, sortByOptions } from "./constants";
import { getTopItems } from "./queries";
import { styles } from "./styles";
import { translations } from "./translations";

const ItemsPerformanceScreen = (): React.JSX.Element => {
  const [dateRange, setDateRange] = useState<DateUnit>("month");
  const [sortBy, setSortBy] = useState<Metric>("profit");
  const [sortDirection, toggleSortDirection] = useReducer(
    (val) => (val === "desc" ? "asc" : "desc"),
    "desc",
  );

  const { data: topItems = [] } = useQuery({
    placeholderData: keepPreviousData,
    queryFn: async () => getTopItems({ dateRange, metric: sortBy, sortDirection }),
    queryKey: ["topItems", dateRange, sortBy, sortDirection],
    staleTime: 60 * 1000, // 1 min
  });

  const t = useTranslation(translations);

  return (
    <Screen goBack title={t.title}>
      <SegmentedControl
        onChange={setDateRange}
        options={dateRangeOptions.map((el) => ({
          text: t.dateRange[el],
          value: el,
        }))}
        value={dateRange}
      />
      <View style={styles.sortByRow}>
        <Select
          label={t.sortBy.title}
          onChange={setSortBy}
          options={sortByOptions.map((el) => ({
            text: t.sortBy[el],
            value: el,
          }))}
          style={commonStyles.grow}
          value={sortBy}
        />
        <Button
          icon={sortDirection === "asc" ? "arrowUp" : "arrowDown"}
          onPress={toggleSortDirection}
          variant={"outline"}
        />
      </View>
      <List data={topItems} renderItem={({ item }) => <ItemPerformance {...item} />} />
    </Screen>
  );
};

export { ItemsPerformanceScreen };
