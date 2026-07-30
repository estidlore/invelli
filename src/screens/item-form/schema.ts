import { z } from "zod";

import { nullableText } from "@/utils";

const schema = z.object({
  buyPrice: z.coerce.number("number").positive("positive"),
  code: z
    .string()
    .trim()
    .max(30, "max")
    .regex(/^[A-Za-z0-9\-_]*$/, "snakeOrKebab")
    .transform(nullableText),
  name: z.string().trim().min(2, "min").max(50, "max"),
  quantity: z.coerce.number("number").nonnegative("nonnegative"),
  sellPrice: z.coerce.number("number").positive("positive"),
});

export { schema };
