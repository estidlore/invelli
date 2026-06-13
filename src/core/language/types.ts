type LanguageId = "ENG" | "SPA";

interface LanguageInfo {
  id: LanguageId;
  label: string;
}

interface Translation {
  [K: string]: Translation | string;
}

type Translations<T extends Translation> = Record<LanguageId, T>;

export type { LanguageId, LanguageInfo, Translation, Translations };
