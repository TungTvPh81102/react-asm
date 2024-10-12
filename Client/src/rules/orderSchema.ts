import z from "zod";

export const orderSchema = z.object({
  user_id: z.any(),
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Email must be a valid email address")
    .nonempty("Email is required"),
  products: z
    .array(
      z.object({
        product_id: z.string().nonempty("Product ID is required"),
        quantity: z
          .number()
          .int()
          .min(1, "Quantity must be at least 1")
          .nonnegative("Quantity must be a non-negative number"),
      })
    )
    .nonempty("Products are required"),
  address: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  status: z.enum(["true", "false"]).default("false"),
  delivery: z
    .enum(["PROCESSING", "DELIVERING", "SUCCESS_DELIVERY", "CANCELLED"])
    .default("PROCESSING"),
  total: z
    .number()
    .min(0, "Total must be at least 0")
    .refine(
      (value) =>
        Number.isFinite(value) && Math.floor(value * 100) === value * 100,
      "Total must have at most 2 decimal places"
    ),
  note: z.string().optional().default(""),
});
