import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    metrics: {
      buyPrice: "Buy price",
      margin: "Margin",
      profit: "Profit",
      revenue: "Revenue",
      sellPrice: "Sell price",
      shrinkage: "Losses/damages",
      title: "Sort by",
      unitsSold: "Units sold",
    },
  },
  SPA: {
    metrics: {
      buyPrice: "Costo",
      margin: "Margen",
      profit: "Beneficio",
      revenue: "Ventas",
      sellPrice: "Precio de venta",
      shrinkage: "Pérdidas/daños",
      title: "Ordenar por",
      unitsSold: "Unidades vendidas",
    },
  },
});

export { translations };
