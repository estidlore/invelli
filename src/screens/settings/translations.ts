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
    toast: {
      dataExportError: "Failed to export data",
      dataExported: "Data exported",
      dataImportError: "Failed to import data",
      dataImported: "Data imported",
    },
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
    toast: {
      dataExportError: "Error al exportar la información",
      dataExported: "Información exportada",
      dataImportError: "Error al importar la información",
      dataImported: "Información importada",
    },
  },
});

export { translations };
