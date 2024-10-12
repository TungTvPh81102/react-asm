import joi from "joi";

export const categoryRule = joi.object({
  name: joi.string().required().min(3).max(30).messages({
    "any.required": "Tên danh mục là bắt buộc",
    "string.empty": "Tên danh mục không được để trống",
    "string.min": "Tên danh mục phải tối thiểu 3 ký tự",
    "string.max": "Tên danh mục tối đa 30 ký tự",
  }),
  slug: joi.string().optional(),
  status: joi.boolean().messages({
    "boolean.base": "Trạng thái không hợp lệ",
  }),
});
