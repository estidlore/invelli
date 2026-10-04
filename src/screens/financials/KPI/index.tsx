import { View } from "react-native";

import { Text } from "@/components";
import { NUM_FORMATS } from "@/utils";

import { styles } from "./styles";
import type { KpiProps } from "./types";

const KPI = ({ label, value }: KpiProps): React.JSX.Element => {
  return (
    <View style={styles.kpi}>
      <Text>{label}</Text>
      <Text>{NUM_FORMATS.PRICE.format(value)}</Text>
    </View>
  );
};

export { KPI };
