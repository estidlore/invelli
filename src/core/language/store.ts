import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageId } from "./types";

interface LanguageState {
  languagePreference: LanguageId;
  setLanguagePreference: (preference: LanguageId) => void;
}

const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      languagePreference: "ENG",
      setLanguagePreference: (preference: LanguageId): void => {
        set({ languagePreference: preference });
      },
    }),
    {
      name: "store:language",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export { useLanguageStore };
