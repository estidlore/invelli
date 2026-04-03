import { Language } from "utils";

const { entries, useTranslation } = Language.translation({
  ENG: {
    product: "Product",
  },
  SPA: {
    product: "Producto",
  },
});

export { entries, useTranslation };
