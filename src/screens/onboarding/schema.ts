import { z } from "zod";

const schema = z.object({
  businessName: z.string().trim().min(2, "min"),
});

export { schema };
