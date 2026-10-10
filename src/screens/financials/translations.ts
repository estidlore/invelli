import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    dateRange: {
      day: "Day",
      month: "Month",
      week: "Week",
    },
    grossProfit: "Gross profit",
    inventory: {
      buyTotal: "Total stock cost",
      quantityTotal: "Total items in stock",
      sellTotal: "Total stock sell price",
      title: "Inventory",
      uniqueItems: "Catalog items",
    },
    netCOGS: "Cost of goods",
    netInventoryProfit: "Inventory adjustments",
    netProfit: "Net profit",
    netRevenue: "Net revenue",
    seeItemsPerformance: "See items performance",
    title: "Finantial summary",
    transactions: "Transactions",
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
    inventory: {
      buyTotal: "Costo total de inventario",
      quantityTotal: "Artículos en inventario",
      sellTotal: "Valor total de venta",
      title: "Inventario",
      uniqueItems: "Artículos en catálogo",
    },
    netCOGS: "Costo de ventas",
    netInventoryProfit: "Ajustes de inventario",
    netProfit: "Beneficios netos",
    netRevenue: "Ventas netas",
    seeItemsPerformance: "Ver rendimiento de artículos",
    title: "Resumen financiero",
    transactions: "Transacciones",
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
