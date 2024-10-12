import joi from "joi";

export const productRule = joi.object({
  name: joi.string().required().min(3).max(255).messages({
    "any.required": "Tên sản phẩm là bắt buộc",
    "string.empty": "Tên sản phẩm không được để trống",
    "string.min": "Tên sản phẩm phải tối thiểu 3 ký tự",
    "string.max": "Tên sản phẩm tối đa 255 ký tự",
  }),
  slug: joi.string().optional(),
  price: joi.number().required().min(1).messages({
    "any.required": "Giá sản phẩm là bắt buộc",
    "number.base": "Giá sản phẩm phải là một số",
    "number.min": "Giá sản phẩm phải là số dương",
  }),
  thumbnail: joi.string().required().messages({
    "any.required": "Thumbnail là bắt buộc",
    "string.empty": "Thumbnail không được để trống",
  }),
  discount: joi.number().default(0).messages({
    "number.base": "Giảm giá phải là số dương",
  }),
  quantity: joi.number().default(0).messages({
    "number.base": "Số lượng phải là số",
  }),
  status: joi.boolean().messages({
    "boolean.base": "Trạng thái không hợp lệ",
  }),
  description: joi.string().optional().messages({
    "string.base": "Mô tả phải là một chuỗi",
  }),
  content: joi.string().optional().messages({
    "string.base": "Nội dung phải là một chuỗi",
  }),
  category_id: joi.string().required().messages({
    "any.required": "Danh mục là bắt buộc",
  }),
});
