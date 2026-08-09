import type { ActivityIndicatorProps } from "react-native";

import type { ThemeColor } from "@/core/theme";

interface SpinnerProps extends ActivityIndicatorProps {
  color?: ThemeColor;
}

export type { SpinnerProps };
