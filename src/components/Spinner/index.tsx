import { ActivityIndicator, View } from "react-native";

import { commonStyles, useColors } from "@/core/theme";

import type { SpinnerProps } from "./types";

const Spinner = ({
  color = "primary",
  size = "large",
  style,
  ...rest
}: SpinnerProps): React.JSX.Element => {
  const colors = useColors();

  return (
    <View style={[commonStyles.center, style]}>
      <ActivityIndicator {...rest} color={colors[color]} size={size} />
    </View>
  );
};

export { Spinner };
