import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    addItem: "Add item",
    deleteItem: "Delete item",
    editItem: "Edit item",
    label: {
      buyPrice: "Cost",
      code: "Code",
      name: "Name",
      quantity: "Quantity",
      sellPrice: "Selling price",
    },
    placeholder: {
      code: "Ex. 1234567890",
      name: "Ex. Soda Coke 1.5L",
      number: "Ex. 10",
    },
    save: "Save",
    toast: {
      itemAddError: "Failed to add item",
      itemAdded: "Item added",
      itemDeleteError: "Failed to delete item",
      itemDeleted: "Item deleted",
      itemInActiveTransactions: "Item in active transactions",
      itemUpdateError: "Failed to update item",
      itemUpdated: "Item updated",
    },
  },
  SPA: {
    addItem: "Agregar artículo",
    deleteItem: "Eliminar artículo",
    editItem: "Editar artículo",
    label: {
      buyPrice: "Costo",
      code: "Código",
      name: "Nombre",
      quantity: "Cantidad",
      sellPrice: "Precio de venta",
    },
    placeholder: {
      code: "Ej. 1234567890",
      name: "Ej. Gaseosa CocaCola 1.5L",
      number: "Ej. 10",
    },
    save: "Guardar",
    toast: {
      itemAddError: "Error al agregar el artículo",
      itemAdded: "Artículo agregado",
      itemDeleteError: "Error al eliminar el artículo",
      itemDeleted: "Artículo eliminado",
      itemInActiveTransactions: "Artículo en transacciones activas",
      itemUpdateError: "Error al actualizar el artículo",
      itemUpdated: "Artículo actualizado",
    },
  },
});

export { translations };
