import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    language: "Language",
    mode: {
      dark: "Dark",
      light: "Light",
      system: "System",
      title: "Mode",
    },
    title: "Preferences",
  },
  SPA: {
    language: "Lenguaje",
    mode: {
      dark: "Oscuro",
      light: "Claro",
      system: "Sistema",
      title: "Modo",
    },
    title: "Preferencias",
  },
});

export { translations };
