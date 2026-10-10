import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    dateRange: {
      day: "Day",
      month: "Month",
      week: "Week",
    },
    sortBy: {
      buyPrice: "Buy price",
      margin: "Margin",
      profit: "Profit",
      revenue: "Revenue",
      sellPrice: "Sell price",
      shrinkage: "Losses/damages",
      stock: "Stock",
      title: "Sort by",
      unitsSold: "Units sold",
    },
    title: "Items performance",
  },
  SPA: {
    dateRange: {
      day: "Día",
      month: "Mes",
      week: "Semana",
    },
    sortBy: {
      buyPrice: "Costo",
      margin: "Margen",
      profit: "Beneficio",
      revenue: "Ventas",
      sellPrice: "Precio de venta",
      shrinkage: "Pérdidas/daños",
      stock: "Inventario",
      title: "Ordenar por",
      unitsSold: "Unidades vendidas",
    },
    title: "Rendimiento de artículos",
  },
});

export { translations };
