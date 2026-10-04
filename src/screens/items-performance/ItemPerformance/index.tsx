import { useRouter } from "expo-router";

import { Card, Text } from "@/components";
import { useTranslation } from "@/core/language";
import { commonStyles } from "@/core/theme";
import { NUM_FORMATS } from "@/utils";

import { translations } from "./translations";
import type { ItemPerformanceProps, Metric } from "./types";

const metricFormat: Record<Metric, keyof typeof NUM_FORMATS> = {
  buyPrice: "PRICE",
  margin: "PERCENT",
  profit: "PRICE",
  revenue: "PRICE",
  sellPrice: "PRICE",
  shrinkage: "PRICE",
  unitsSold: "QUANTITY",
};

const ItemPerformance = ({
  id,
  metric,
  name,
  rank,
  value,
}: ItemPerformanceProps): React.JSX.Element => {
  const router = useRouter();
  const t = useTranslation(translations);

  const handlePress = (): void => {
    router.push({
      params: { id },
      pathname: "/items/[id]",
    });
  };

  return (
    <Card onPress={handlePress} style={commonStyles.column}>
      <Text type={"semibold"}>{`#${rank}  ${name}`}</Text>
      <Text>{`${t.metrics[metric]}:  ${NUM_FORMATS[metricFormat[metric]].format(value)}`}</Text>
    </Card>
  );
};

export { ItemPerformance };
