import { useColorScheme } from "react-native";

import type { Theme } from "./colors";
import { COLORS } from "./colors";
import { useThemeStore } from "./store";

const useColors = (): Theme => {
  const themePreference = useThemeStore((state) => state.themePreference);
  const colorScheme = useColorScheme() ?? "light";

  if (themePreference !== "system") {
    return COLORS[themePreference];
  }
  return COLORS[colorScheme];
};

export { useColors };
