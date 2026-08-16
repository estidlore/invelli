import { round } from "litus";
import { z } from "zod";

const baseSchema = z.object({
  buyPrice: z.coerce
    .number("number")
    .positive("positive")
    .transform((val) => round(val, 2)),
  quantity: z.coerce
    .number("number")
    .positive("positive")
    .transform((val) => round(val, 3)),
});

const fullSchema = baseSchema.extend({
  sellPrice: z.coerce
    .number("number")
    .positive("positive")
    .transform((val) => round(val, 2)),
});

export { baseSchema, fullSchema };
