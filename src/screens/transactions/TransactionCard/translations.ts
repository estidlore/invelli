import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    draft: "Draft",
    edit: "Edit",
    items: "Items",
    notes: "Notes",
    reasonMap: {
      DAMAGE: "Damage",
      FOUND: "Found",
      MISSING: "Missing",
      PURCHASE: "Purchase",
      PURCHASE_RETURN: "Purchase return",
      SALE: "Sale",
      SALE_RETURN: "Sale return",
    },
    statusMap: {
      COMPLETE: "Completed",
      DRAFT: "Draft",
      VOID: "Voided",
    },
  },
  SPA: {
    draft: "Borrador",
    edit: "Editar",
    items: "Artículos",
    notes: "Notas",
    reasonMap: {
      DAMAGE: "Daño",
      FOUND: "Encontrado",
      MISSING: "Faltante",
      PURCHASE: "Compra",
      PURCHASE_RETURN: "Devolución de compra",
      SALE: "Venta",
      SALE_RETURN: "Devolución de venta",
    },
    statusMap: {
      COMPLETE: "Completada",
      DRAFT: "Borrador",
      VOID: "Anulada",
    },
  },
});

export { translations };
