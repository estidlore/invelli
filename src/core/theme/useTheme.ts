import { useColorScheme } from "react-native";

import type { ThemeName } from "./colors";
import { useThemeStore } from "./store";

const useTheme = (): ThemeName => {
  const themePreference = useThemeStore((state) => state.themePreference);
  const colorScheme = useColorScheme() ?? "light";

  if (themePreference !== "system") {
    return themePreference;
  }
  return colorScheme;
};

export { useTheme };
