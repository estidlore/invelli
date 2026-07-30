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
      sellPrice: "Sell price",
    },
    placeholder: {
      code: "Ex. 1234567890",
      name: "Ex. Soda Coke 1.5L",
      number: "Ex. 10",
    },
    save: "Save",
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
  },
});

export { translations };
