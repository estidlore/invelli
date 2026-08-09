import { type ThemeColor, useColors } from "@/core/theme";

import type { ButtonVariant, ButtonVariantStyle } from "./types";

const useButtonColors = (variant: ButtonVariant, color: ThemeColor): ButtonVariantStyle => {
  const colors = useColors();

  switch (variant) {
    case "outline":
      return {
        borderColor: colors[color],
        borderWidth: 1,
        color,
      };
    case "solid":
      return {
        backgroundColor: colors[color],
        borderWidth: 0,
        color: "text",
      };
    case "text":
      return {
        borderWidth: 0,
        color,
      };
  }
};

export { useButtonColors };
