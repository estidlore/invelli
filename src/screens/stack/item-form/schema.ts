import { z } from "zod";

export const itemFormSchema = z.object({
  costPrice: z.preprocess(
    (val) => (val === "" || val === undefined ? 0 : Number(val)),
    z.number("number").positive("positive"),
  ),
  name: z.string().trim().min(2, "min").max(50, "max"),
  quantity: z.preprocess(
    (val) => (val === "" || val === undefined ? 0 : Number(val)),
    z.number("number").int("int").nonnegative("nonnegative"),
  ),
  sellPrice: z.preprocess(
    (val) => (val === "" || val === undefined ? 0 : Number(val)),
    z.number("number").positive("positive"),
  ),
  sku: z
    .string()
    .trim()
    .max(30, "max")
    .regex(/^[A-Za-z0-9\-_]+$/, "snakeOrKebab"),
});
