import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    items: {
      addError: "Failed to add item",
      added: "Item added",
      codeNotFound: "Code not found",
      empty: "No items yet",
      itemsNotFound: "Items not found",
      loadError: "Failed to load items",
      searchError: "Failed to search item",
      title: "Add items",
    },
    placeholder: {
      search: "Ex. Soda Coke 1.5L",
    },
  },
  SPA: {
    items: {
      addError: "Error al agregar artículos",
      added: "Artículo agregado",
      codeNotFound: "Código no encontrado",
      empty: "Sin artículos aún",
      itemsNotFound: "Artículos no encontrados",
      loadError: "Error al cargar los artículos",
      searchError: "Error al buscar el artículo",
      title: "Agregar artículos",
    },
    placeholder: {
      search: "Ej. Gaseosa CocaCola 1.5L",
    },
  },
});

export { translations };
