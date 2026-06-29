import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    edit: "Edit",
    items: "Items",
    notes: "Notes",
    txReason: {
      DAMAGE: "Damage",
      FOUND: "Found",
      MISSING: "Missing",
      PURCHASE: "Purchase",
      PURCHASE_RETURN: "Purchase return",
      SALE: "Sale",
      SALE_RETURN: "Sale return",
    },
  },
  SPA: {
    edit: "Editar",
    items: "Artículos",
    notes: "Notas",
    txReason: {
      DAMAGE: "Daño",
      FOUND: "Encontrado",
      MISSING: "Faltante",
      PURCHASE: "Compra",
      PURCHASE_RETURN: "Devolución de compra",
      SALE: "Venta",
      SALE_RETURN: "Devolución de venta",
    },
  },
});

export { translations };
