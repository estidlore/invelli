import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    export: "Export data",
    exportError: "Failed to export data",
    exported: "Data exported",
    import: "Import data",
    importError: "Failed to import data",
    imported: "Data imported",
    title: "Data",
  },
  SPA: {
    export: "Exportar información",
    exportError: "Error al exportar la información",
    exported: "Información exportada",
    import: "Importar información",
    importError: "Error al importar la información",
    imported: "Información importada",
    title: "Información",
  },
});

export { translations };
