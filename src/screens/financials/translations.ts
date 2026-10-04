import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    dateRange: {
      day: "Day",
      month: "Month",
      week: "Week",
    },
    grossProfit: "Gross profit",
    netCOGS: "Cost of goods",
    netInventoryProfit: "Inventory adjustments",
    netProfit: "Net profit",
    netRevenue: "Net revenue",
    seeItemsPerformance: "See items performance",
    title: "Finantial summary",
    txReasonMap: {
      DAMAGE: "Damage",
      FOUND: "Found",
      MISSING: "Missing",
      PURCHASE: "Purchases",
      PURCHASE_RETURN: "Purchase returns",
      SALE: "Sales",
      SALE_RETURN: "Sale returns",
    },
  },
  SPA: {
    dateRange: {
      day: "Día",
      month: "Mes",
      week: "Semana",
    },
    grossProfit: "Beneficios brutos",
    netCOGS: "Costo de ventas",
    netInventoryProfit: "Ajustes de inventario",
    netProfit: "Beneficios netos",
    netRevenue: "Ventas netas",
    seeItemsPerformance: "Ver rendimiento de artículos",
    title: "Resumen financiero",
    txReasonMap: {
      DAMAGE: "Daños",
      FOUND: "Encontrados",
      MISSING: "Faltantes",
      PURCHASE: "Compras",
      PURCHASE_RETURN: "Devoluciones de compra",
      SALE: "Ventas",
      SALE_RETURN: "Devoluciones de venta",
    },
  },
});

export { translations };
