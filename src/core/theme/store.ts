import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ThemeName } from "./colors";

type ThemePreference = ThemeName | "system";

interface ThemeState {
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      setThemePreference: (preference): void => {
        set({ themePreference: preference });
      },
      themePreference: "system",
    }),
    {
      name: "store:theme",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export type { ThemePreference };
export { useThemeStore };
