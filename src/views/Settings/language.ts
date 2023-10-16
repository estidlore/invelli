import { Language } from "utils/contexts";

const { entries, useTranslation } = Language.translation({
  ENG: {
    language: "Language",
    shareData: "Share data",
  },
  SPA: {
    language: "Lenguaje",
    shareData: "Compartir datos",
  },
});

export { entries, useTranslation };
