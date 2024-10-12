import zod from "zod";

export const productSchema = zod.object({
  name: zod.string().min(3).max(255),
  price: zod.number().min(1),
  discount: zod.number().optional().nullable(),
  quantity: zod.number().optional().nullable(),
  thumbnail: zod.string().url(),
  description: zod.string().optional().nullable(),
  category_id: zod.string().nonempty(),
  status: zod.enum(["true", "false"]).optional(),
});
