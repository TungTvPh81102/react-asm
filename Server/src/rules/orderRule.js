import Joi from "joi";

const orderRule = Joi.object({
  user_id: Joi.string().required().messages({
    "string.empty": "User ID is required",
    "any.required": "User ID is required",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
    "string.empty": "Email is required",
  }),
  products: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.string().required().messages({
          "string.empty": "Product ID is required",
          "any.required": "Product ID is required",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Quantity must be a number",
          "number.integer": "Quantity must be an integer",
          "number.min": "Quantity must be at least 1",
          "any.required": "Quantity is required",
        }),
      })
    )
    .required()
    .messages({
      "array.base": "Products must be an array",
      "array.items": "Each product must be an object",
      "any.required": "Products are required",
    }),
  address: Joi.string().optional().allow(""),
  phone: Joi.string().optional().allow(""),
  status: Joi.boolean().default(true),
  delivery: Joi.string()
    .valid("PROCESSING", "DELIVERING", "SUCCESS_DELIVERY", "CANCELLED")
    .default("PROCESSING"),
  total: Joi.number().precision(2).min(0).required().messages({
    "number.base": "Total must be a number",
    "number.precision": "Total must have at most 2 decimal places",
    "number.min": "Total must be at least 0",
    "any.required": "Total is required",
  }),
  note: Joi.string().optional().allow(""),
});

export default orderRule;
