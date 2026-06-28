import type { StyleProp, TextStyle, ViewProps, ViewStyle } from "react-native";

import { IconName } from "./names";

interface IconProps extends ViewProps {
  color?: string;
  name: IconName;
  size?: number;
  style?: StyleProp<TextStyle & ViewStyle>;
}

export type { IconName, IconProps };
