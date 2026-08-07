import { z } from "zod";

import { TX_REASONS } from "@/db";
import { nullableText } from "@/utils";

const schema = z.object({
  notes: z.string().trim().max(500, "max").transform(nullableText),
  reason: z.enum(TX_REASONS),
});

export { schema };
