import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    itemsNotFound: "No items found\nCheck the spelling",
    itemsSearchError: "Failed to search items",
    searchPlaceholder: "Ex. Soda Coke 1.5L",
  },
  SPA: {
    itemsNotFound: "No se encontraron artículos\nRevisa la ortografía",
    itemsSearchError: "Fallo al buscar artículos",
    searchPlaceholder: "Ej. Gaseosa CocaCola 1.5L",
  },
});

export { translations };
