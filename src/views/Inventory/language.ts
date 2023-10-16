import { Language } from "utils/contexts";

const { entries, useTranslation } = Language.translation({
  ENG: {
    addItem: "Add item",
    itemsNotFound: "Item(s) not found",
  },
  SPA: {
    addItem: "Agregar artículo",
    itemsNotFound: "Artículo(s) no encontrado(s)",
  },
});

export { entries, useTranslation };
