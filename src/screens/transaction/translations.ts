import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    date: "Date",
    draft: "Draft",
    goBack: "Go back",
    items: {
      empty: "No items yet",
      insufficientStock: "Insufficient stock for one or more items",
      loadError: "Failed to load items",
      title: "Items",
    },
    map: {
      reason: {
        DAMAGE: "Damage",
        FOUND: "Found",
        MISSING: "Missing",
        PURCHASE: "Purchase",
        PURCHASE_RETURN: "Purchase return",
        SALE: "Sale",
        SALE_RETURN: "Sale return",
      },
      status: {
        COMPLETE: "Completed",
        DRAFT: "Draft",
        VOID: "Voided",
      },
    },
    notes: "Notes",
    reason: "Type",
    receipt: {
      thanks: "Thanks for your visit!",
      title: "Receipt",
    },
    status: "Status",
    total: "Total",
    transaction: {
      complete: "Complete transaction",
      completeError: "Failed to complete transaction",
      completed: "Transaction completed",
      loadError: "Failed to load transaction",
      title: "Transaction",
    },
  },
  SPA: {
    date: "Fecha",
    draft: "Borrador",
    goBack: "Ir atrás",
    items: {
      empty: "Sin artículos aún",
      insufficientStock: "Inventario insuficiente para uno o más artículos",
      loadError: "Error al cargar los artículos",
      title: "Artículos",
    },
    map: {
      reason: {
        DAMAGE: "Daño",
        FOUND: "Encontrado",
        MISSING: "Faltante",
        PURCHASE: "Compra",
        PURCHASE_RETURN: "Devolución de compra",
        SALE: "Venta",
        SALE_RETURN: "Devolución de venta",
      },
      status: {
        COMPLETE: "Completada",
        DRAFT: "Borrador",
        VOID: "Anulada",
      },
    },
    notes: "Notas",
    reason: "Tipo",
    receipt: {
      thanks: "¡Gracias por tu visita!",
      title: "Recibo",
    },
    status: "Estado",
    total: "Total",
    transaction: {
      complete: "Completar transacción",
      completeError: "Error al completar la transacción",
      completed: "Transacción completada",
      loadError: "Error al cargar la transacción",
      title: "Transacción",
    },
  },
});

export { translations };
