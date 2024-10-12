import joi from "joi";

export const cartRule = joi.object({
  user_id: joi.string().required().messages({
    "any.required": "ID người dùng là bắt buộc",
    "string.base": "ID người dùng phải là một chuỗi ký tự",
  }),
  product_id: joi.string().required().messages({
    "any.required": "ID sản phẩm là bắt buộc",
    "string.base": "ID sản phẩm phải là một chuỗi ký tự",
  }),
  quantity: joi.number().required().min(1).messages({
    "any.required": "Số lượng sản phẩm là bắt buộc",
    "number.base": "Số sản phẩm phải là một số",
    "number.min": "Số lượng sản phẩm phải lớn hơn 0",
  }),
});
