import type { TextStyle, TouchableOpacityProps } from "react-native";

import type { IconName } from "@/components/Icon";
import type { ThemeColor } from "@/core/theme";

type ButtonVariant = "outline" | "solid" | "text";
interface ButtonVariantStyle extends Pick<
  TextStyle,
  "backgroundColor" | "borderColor" | "borderWidth"
> {
  color?: string;
}

interface ButtonProps extends TouchableOpacityProps {
  children?: string;
  color?: ThemeColor;
  icon?: IconName;
  iconSize?: number;
  variant?: ButtonVariant;
}

export type { ButtonProps, ButtonVariant, ButtonVariantStyle };
