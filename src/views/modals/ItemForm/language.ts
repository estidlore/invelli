import { Language } from "utils/contexts";

const { entries, useTranslation } = Language.translation({
  ENG: {
    brand: "Brand",
    code: "Code",
    cost: "Cost",
    name: "Name",
    price: "Price",
    quantity: "Quantity",
    save: "Save",
    title: (item: object): string => {
      const empty = Object.keys(item).length === 0;
      return `${empty ? "Add" : "Edit"} item`;
    },
    unit: "Unit (g/ml)",
  },
  SPA: {
    brand: "Marca",
    code: "Código",
    cost: "Costo",
    name: "Nombre",
    price: "Precio",
    quantity: "Cantidad",
    save: "Guardar",
    title: (item: object): string => {
      const empty = Object.keys(item).length === 0;
      return `${empty ? "Agregar" : "Editar"} artículo`;
    },
    unit: "Unidad (g/ml)",
  },
});

export { entries, useTranslation };
