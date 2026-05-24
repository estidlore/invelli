import type { TextProps } from "react-native";
import { Text as RNText } from "react-native";

import { useColors } from "@/core/theme";

import { styles } from "./styles";

type ThemedTextProps = TextProps & {
  type?: keyof typeof styles;
};

const Text = ({ style, type = "regular", ...rest }: ThemedTextProps): React.JSX.Element => {
  const colors = useColors();

  return <RNText style={[styles[type], { color: colors.text }, style]} {...rest} />;
};

export { Text };
