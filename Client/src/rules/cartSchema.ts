import { z } from "zod";

export const cartSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1").int(),
});
