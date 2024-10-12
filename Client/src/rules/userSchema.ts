import zod from "zod";

export const userSchema = zod.object({
  name: zod.string().min(3).max(30),
  email: zod.string().email(),
  password: zod.string().min(6).max(255),
  avatar: zod.string().optional().nullable().default(null),
  status: zod.enum(["true", "false"]).optional(),
  role: zod.enum(["member", "admin"]).default("member"),
});
