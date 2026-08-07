import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    loadError: "Failed to load transactions",
    noTransactions: "No transactions yet",
    startError: "Failed to start transaction",
    title: "Transactions",
  },
  SPA: {
    loadError: "Error al cargar las transacciones",
    noTransactions: "Sin transacciones aún",
    startError: "Error al iniciar la transacción",
    title: "Transacciones",
  },
});

export { translations };
