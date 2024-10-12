import Joi from "joi";

export const userRule = Joi.object({
  name: Joi.string().optional().required().messages({
    "any.required": "Tên người dùng là bắt buộc",
    "string.empty": "Tên người dùng không được để trống",
    "string.base": "Tên người dung phải là một chuỗi ký tự",
  }),
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
  avatar: Joi.optional(),
  status: Joi.boolean().default(true).messages({
    "boolean.base": "Trạng thái không hợp lệ",
  }),
  role: Joi.string().valid("member", "admin").default("member").messages({
    "string.base": "Vai trò phải là một chuỗi ký tự",
    "any.only": "Vai trò phải là một trong các giá trị sau: member, admin",
  }),
});
