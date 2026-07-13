import type { ThemeColor } from "@/core/theme";
import { useColors } from "@/core/theme";

import type { ButtonVariant, ButtonVariantStyle } from "./types";

const useButtonColors = (variant: ButtonVariant, colorName: ThemeColor): ButtonVariantStyle => {
  const colors = useColors();
  const color = colors[colorName];

  switch (variant) {
    case "outline":
      return {
        borderColor: color,
        borderWidth: 1,
        color,
      };
    case "solid":
      return {
        backgroundColor: color,
        borderWidth: 0,
        color: colors.text,
      };
    case "text":
      return {
        borderWidth: 0,
        color,
      };
  }
};

export { useButtonColors };
