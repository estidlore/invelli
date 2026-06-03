const dummyItems = [
  {
    costPrice: 9500,
    createdAt: "2026-05-31 01:23 pm",
    id: "101",
    name: "Salsa de Tomate Fruco 500g",
    quantity: 5,
    sellPrice: 11000,
    sku: "123456781",
    updatedAt: "2026-05-31 01:25 pm",
  },
  {
    costPrice: 17800,
    createdAt: "2026-05-31 01:28 pm",
    id: "102",
    name: "Salsa de Tomate Fruco 1000g",
    quantity: 3,
    sellPrice: 20600,
    sku: "123456782",
    updatedAt: "2026-05-31 01:30 pm",
  },
];

type Item = (typeof dummyItems)[0];

export type { Item };

export { dummyItems };
