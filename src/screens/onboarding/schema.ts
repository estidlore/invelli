import { z } from "zod";

const schema = z.object({
  businessName: z.string().trim(),
});

export { schema };
