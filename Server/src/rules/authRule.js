import Joi from "joi";

export const signUpSchema = Joi.object({
  email: Joi.string().email().required().trim().messages({
    "string.base": "Email phải là một chuỗi ký tự",
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.base": "Mật khẩu phải là một chuỗi ký tự",
    "any.required": "Mật khẩu là bắt buộc",
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "string.min": "Mật khẩu chỉ được nhập tối đa 255 ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Xác nhận mật khẩu phải khớp với mật khẩu",
    "any.required": "Xác nhận mật khẩu là bắt buộc",
    "string.empty": "Xác nhận mật khẩu không được để trống",
  }),
}).with("password", "confirmPassword");

export const signInSchema = Joi.object({
  email: Joi.string().email().required().trim().messages({
    "string.base": "Email phải là một chuỗi ký tự",
    "string.email": "Email không hợp lệ",
    "any.required": "Email là bắt buộc",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.base": "Mật khẩu phải là một chuỗi ký tự",
    "any.required": "Mật khẩu là bắt buộc",
    "string.empty": "Mật khẩu không được để trống",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "string.min": "Mật khẩu chỉ được nhập tối đa 255 ký tự",
  }),
});
