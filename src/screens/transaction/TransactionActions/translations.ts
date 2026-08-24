import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    delete: "Delete transaction",
    deleteError: "Failed to delete transaction",
    deleted: "Transaction deleted",
    receipt: {
      footer: "Thanks for your visit!",
      notes: "Notes",
      poweredBy: "Powered by {{appName}}",
      return: "Return Receipt",
      sale: "Sale Receipt",
      shareError: "Failed to share receipt",
      shared: "Receipt shared",
      total: "Total",
    },
    void: "Void transaction",
    voidError: "Failed to void transaction",
    voided: "Transaction voided",
  },
  SPA: {
    delete: "Eliminar transacción",
    deleteError: "Error al eliminar la transacción",
    deleted: "Transacción eliminada",
    receipt: {
      footer: "¡Gracias por tu visita!",
      notes: "Notas",
      poweredBy: "Generado por {{appName}}",
      return: "Recibo de Devolución",
      sale: "Recibo de Venta",
      shareError: "Error al compartir el recibo",
      shared: "Recibo compartido",
      total: "Total",
    },
    void: "Anular transacción",
    voidError: "Error al anular la transacción",
    voided: "Transacción anulada",
  },
});

export { translations };
