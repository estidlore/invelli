import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    addItem: "Add item",
    itemsNotFound: "No items found\nCheck the spelling",
    itemsSearchError: "Failed to search items",
    searchPlaceholder: "Soda Coke 1.5L",
  },
  SPA: {
    addItem: "Agregar artículo",
    itemsNotFound: "No se encontraron artículos\nRevisa la ortografía",
    itemsSearchError: "Fallo al buscar artículos",
    searchPlaceholder: "Gaseosa CocaCola 1.5L",
  },
});

export { translations };
