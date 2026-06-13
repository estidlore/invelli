import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    darkMode: {
      dark: "Enabled",
      light: "Disabled",
      system: "Use system settings",
      title: "Dark mode",
    },
    exportData: "Export data",
    importData: "Import data",
    language: "Language",
    settings: "Settings",
  },
  SPA: {
    darkMode: {
      dark: "Activado",
      light: "Desactivado",
      system: "Usar configuración del sistema",
      title: "Modo oscuro",
    },
    exportData: "Exportar información",
    importData: "Importar información",
    language: "Lenguaje",
    settings: "Configuraciones",
  },
});

export { translations };
