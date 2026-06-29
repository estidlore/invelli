import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    addItem: "Add item",
    editItem: "Edit item",
    label: {
      buyPrice: "Cost",
      name: "Name",
      quantity: "Quantity",
      sellPrice: "Sell price",
      sku: "Barcode",
    },
    placeholder: {
      name: "Ex. Soda Coke 1.5L",
      number: "Ex. 10",
      sku: "Ex. 1234567890",
    },
    save: "Save",
  },
  SPA: {
    addItem: "Agregar artículo",
    editItem: "Editar artículo",
    label: {
      buyPrice: "Costo",
      name: "Nombre",
      quantity: "Cantidad",
      sellPrice: "Precio de venta",
      sku: "Código",
    },
    placeholder: {
      name: "Ej. Gaseosa CocaCola 1.5L",
      number: "Ej. 10",
      sku: "Ej. 1234567890",
    },
    save: "Guardar",
  },
});

export { translations };
