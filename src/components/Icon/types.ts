import type { StyleProp, TextStyle, ViewProps, ViewStyle } from "react-native";

import { NAMES } from "./names";

type IconName = keyof typeof NAMES;

interface IconProps extends ViewProps {
  color?: string;
  name: IconName;
  size?: number;
  style?: StyleProp<TextStyle & ViewStyle>;
}

export type { IconName, IconProps };
