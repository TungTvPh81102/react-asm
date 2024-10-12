import zod from "zod";

export const signUpSchema = zod
  .object({
    email: zod.string().email(),
    password: zod.string().min(6).max(255),
    confirmPassword: zod.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const signInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(255),
});
