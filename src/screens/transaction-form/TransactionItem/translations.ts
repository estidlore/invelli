import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    available: "Available.",
    buyPrice: "Cost",
    deleteTransactionItem: "Delete item",
    itemDeleteError: "Failed to delete item",
    itemDeleted: "Item deleted",
    quantity: "Quantity",
    save: "Save",
    sellPrice: "Selling price",
  },
  SPA: {
    available: "Disponibles",
    buyPrice: "Costo",
    deleteTransactionItem: "Eliminar artículo",
    itemDeleteError: "Error al eliminar el artículo",
    itemDeleted: "Artículo eliminado",
    quantity: "Cantidad",
    save: "Guardar",
    sellPrice: "Precio de venta",
  },
});

export { translations };
