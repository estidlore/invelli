import type { Theme } from "./colors";
import { COLORS } from "./colors";
import { useTheme } from "./useTheme";

const useColors = (): Theme => {
  const theme = useTheme();
  return COLORS[theme];
};

export { useColors };
