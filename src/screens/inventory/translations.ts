import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    items: {
      empty: "No items yet",
      notFound: "No items found\nCheck the spelling",
      searchError: "Failed to search items",
      searchPlaceholder: "Ex. Soda Coke 1.5L",
    },
  },
  SPA: {
    items: {
      empty: "Sin artículos aún",
      notFound: "No se encontraron artículos\nRevisa la ortografía",
      searchError: "Error al buscar artículos",
      searchPlaceholder: "Ej. Gaseosa CocaCola 1.5L",
    },
  },
});

export { translations };
