import type { ObjectSchema } from "realm";

import type { Schema } from "./types";

const schemas: ObjectSchema[] = [
  {
    name: "Item",
    primaryKey: "code",
    properties: {
      brand: "string?",
      code: "string",
      cost: "int",
      name: "string",
      price: "int",
      quantity: "int",
      unit: "string?"
    }
  } as Schema<"Item">
];

export { schemas };
