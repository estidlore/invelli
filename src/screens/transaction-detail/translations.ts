import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    date: "Date",
    notes: "Notes",
    reason: "Type",
    reasons: {
      DAMAGE: "Damage",
      FOUND: "Found",
      MISSING: "Missing",
      PURCHASE: "Purchase",
      PURCHASE_RETURN: "Purchase return",
      SALE: "Sale",
      SALE_RETURN: "Sale return",
    },
    total: "Total",
    transaction: "Transaction",
  },
  SPA: {
    date: "Fecha",
    notes: "Notas",
    reason: "Tipo",
    reasons: {
      DAMAGE: "Daño",
      FOUND: "Encontrado",
      MISSING: "Faltante",
      PURCHASE: "Compra",
      PURCHASE_RETURN: "Devolución de compra",
      SALE: "Venta",
      SALE_RETURN: "Devolución de venta",
    },
    total: "Total",
    transaction: "Transaction",
  },
});

export { translations };
