import { identity } from "litus";

import type { LanguageInfo, Translation, Translations } from "./types";

const languages: LanguageInfo[] = [
  {
    id: "ENG",
    label: "English",
  },
  {
    id: "SPA",
    label: "Español",
  },
];

const createTranslations: <T extends Translation>(t: Translations<T>) => Translations<T> = identity;

export * from "./store";
export * from "./useTranslation";
export { createTranslations, languages };
