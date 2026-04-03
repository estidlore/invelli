import { Language } from "utils";

const { entries, useTranslation } = Language.translation({
  ENG: {
    brand: "Brand",
    code: "Code",
    cost: "Cost",
    edit: "Editar",
    price: "Price",
    quantity: "Quantity",
    unit: "Unit",
  },
  SPA: {
    brand: "Marca",
    code: "Código",
    cost: "Costo",
    edit: "Editar",
    price: "Precio",
    quantity: "Cantidad",
    unit: "Unidad",
  },
});

export { entries, useTranslation };
