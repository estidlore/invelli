import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    item: {
      add: "Add item",
      addError: "Failed to add item",
      added: "Item added",
      codeInUse: "Code already assigned to another item",
      delete: "Delete item",
      edit: "Edit item",
      updateError: "Failed to update item",
      updated: "Item updated",
    },
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
  },
  SPA: {
    item: {
      add: "Agregar artículo",
      addError: "Error al agregar el artículo",
      added: "Artículo agregado",
      codeInUse: "Código ya asignado a otro producto",
      delete: "Eliminar artículo",
      edit: "Editar artículo",
      updateError: "Error al actualizar el artículo",
      updated: "Artículo actualizado",
    },
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
  },
});

export { translations };
