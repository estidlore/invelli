import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    adjustment: "Stock Adjustment",
    goBack: "Go back",
    items: {
      add: "Add",
      insufficientStock: "Insufficient stock for one or more items",
      loadError: "Failed to load items",
      title: "Items",
    },
    label: {
      notes: "Notes",
      reason: "Transaction type",
    },
    map: {
      reason: {
        DAMAGE: "Damaged items",
        FOUND: "Found items",
        MISSING: "Missing items",
        PURCHASE: "Purchase",
        PURCHASE_RETURN: "Purchase return",
        SALE: "Sale",
        SALE_RETURN: "Sale return",
      },
    },
    purchase: "Purchase",
    return: "Return",
    sale: "Sale",
    save: "Save",
    transaction: {
      add: "Add transaction",
      edit: "Edit transaction",
      notFound: "Transaction not found",
      updateError: "Failed to update transaction",
      updated: "Transaction updated",
    },
  },
  SPA: {
    adjustment: "Ajuste de inventario",
    goBack: "Ir atrás",
    items: {
      add: "Agregar",
      insufficientStock: "Inventario insuficiente para uno o más artículos",
      loadError: "Error al cargar los artículos",
      title: "Artículos",
    },
    label: {
      notes: "Notas",
      reason: "Tipo de transacción",
    },
    map: {
      reason: {
        DAMAGE: "Artículos dañados",
        FOUND: "Artículos encontrados",
        MISSING: "Articulos faltantes",
        PURCHASE: "Compra",
        PURCHASE_RETURN: "Devolución de compra",
        SALE: "Venta",
        SALE_RETURN: "Devolución de venta",
      },
    },
    purchase: "Compra",
    return: "Devolución",
    sale: "Venta",
    save: "Guardar",
    transaction: {
      add: "Agregar transacción",
      edit: "Editar transacción",
      notFound: "Transacción no encontrada",
      updateError: "Error al actualizar la transacción",
      updated: "Transacción actualizada",
    },
  },
});

export { translations };
