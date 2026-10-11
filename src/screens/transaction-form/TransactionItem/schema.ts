import { round } from "litus";
import { z } from "zod";

const baseSchema = z.object({
  buyPrice: z.coerce.number<string>("number").positive("positive").int("int"),
  quantity: z.coerce
    .number<string>("number")
    .positive("positive")
    .transform((val) => round(val, 3)),
});

const fullSchema = baseSchema.extend({
  sellPrice: z.coerce.number<string>("number").positive("positive").int("int"),
});

export { baseSchema, fullSchema };
