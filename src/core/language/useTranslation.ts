import type { LanguageId } from "./store";
import { useLanguageStore } from "./store";

const useTranslation = <T extends Record<string, unknown>>(t: Record<LanguageId, T>): T => {
  const languagePreference = useLanguageStore((state) => state.languagePreference);

  return t[languagePreference];
};

export { useTranslation };
