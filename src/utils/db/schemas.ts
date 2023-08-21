import type { ObjectSchema } from "realm";

import type { Schema } from "./types";

const schemas: ObjectSchema[] = [
  {
    name: "Item",
    primaryKey: "id",
    properties: {
      brand: "string?",
      code: "string?",
      cost: "int",
      id: "uuid",
      name: "string",
      price: "int",
      quantity: "int",
      unit: "string?"
    }
  } as Schema<"Item">,
  {
    name: "Purchase",
    primaryKey: "id",
    properties: {
      date: "date",
      id: "uuid",
      items: "PurchaseItem[]"
    }
  } as Schema<"Purchase">,
  {
    name: "PurchaseItem",
    primaryKey: "id",
    properties: {
      cost: "int",
      id: "uuid",
      item: "Item",
      quantity: "int"
    }
  } as Schema<"PurchaseItem">,
  {
    name: "Sale",
    primaryKey: "id",
    properties: {
      date: "date",
      id: "uuid",
      items: "SaleItem[]"
    }
  } as Schema<"Sale">,
  {
    name: "SaleItem",
    primaryKey: "id",
    properties: {
      id: "uuid",
      item: "Item",
      price: "int",
      quantity: "int"
    }
  } as Schema<"SaleItem">
];

export { schemas };
