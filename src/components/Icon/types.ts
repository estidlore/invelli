import type { StyleProp, TextStyle, ViewProps, ViewStyle } from "react-native";

import type { ThemeColor } from "@/core/theme";

import type { IconName } from "./names";

interface IconProps extends ViewProps {
  color?: ThemeColor;
  name: IconName;
  size?: number;
  style?: StyleProp<TextStyle & ViewStyle>;
}

export type { IconName, IconProps };
