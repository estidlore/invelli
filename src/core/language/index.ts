import type { LanguageId } from "./store";

interface LanguageInfo {
  id: LanguageId;
  label: string;
}

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

export * from "./store";
export * from "./useTranslation";
export { languages };
