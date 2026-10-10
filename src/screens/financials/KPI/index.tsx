import { View } from "react-native";

import { Text } from "@/components";
import { commonStyles } from "@/core/theme";
import { NUM_FORMATS } from "@/utils";

import type { KpiProps } from "./types";

const KPI = ({ format = "PRICE", label, value }: KpiProps): React.JSX.Element => {
  return (
    <View style={commonStyles.rowBetween}>
      <Text>{label}</Text>
      <Text>{NUM_FORMATS[format].format(value)}</Text>
    </View>
  );
};

export { KPI };
