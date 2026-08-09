import type { TextProps as RNTextProps } from "react-native";

import type { ThemeColor } from "@/core/theme";

type TextType = "link" | "regular" | "semibold" | "small" | "subtitle" | "title";

interface TextProps extends RNTextProps {
  color?: ThemeColor;
  type?: TextType;
}

export type { TextProps };
