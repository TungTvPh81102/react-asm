import zod from "zod";

export const categorySchema = zod.object({
  name: zod.string().min(3).max(30),
  status: zod.enum(["true", "false"]).optional(),
});
