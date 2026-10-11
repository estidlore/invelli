import { round } from "litus";
import { z } from "zod";

import { nullableText } from "@/utils";

const schema = z.object({
  buyPrice: z.coerce.number<string>("number").positive("positive").int("int"),
  code: z
    .string()
    .trim()
    .max(30, "max")
    .regex(/^[A-Za-z0-9\-_]*$/, "snakeOrKebab")
    .transform(nullableText),
  name: z.string().trim().min(2, "min").max(50, "max"),
  quantity: z.coerce
    .number<string>("number")
    .nonnegative("nonnegative")
    .transform((val) => round(val, 3)),
  sellPrice: z.coerce.number<string>("number").positive("positive").int("int"),
});

export { schema };
