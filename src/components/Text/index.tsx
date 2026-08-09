import { Text as RNText } from "react-native";

import { useColors } from "@/core/theme";

import { styles } from "./styles";
import type { TextProps } from "./types";

const Text = ({
  color = "text",
  style,
  type = "regular",
  ...rest
}: TextProps): React.JSX.Element => {
  const colors = useColors();

  return <RNText style={[styles[type], { color: colors[color] }, style]} {...rest} />;
};

export { Text };
