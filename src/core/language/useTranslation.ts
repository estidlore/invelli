import { useLanguageStore } from "./store";
import type { Translation, Translations } from "./types";

const useTranslation = <T extends Translation>(t: Translations<T>): T => {
  const languagePreference = useLanguageStore((state) => state.languagePreference);

  return t[languagePreference];
};

export { useTranslation };
