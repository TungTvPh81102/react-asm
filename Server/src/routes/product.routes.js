import express from "express";
import {
  changeStatusProduct,
  createProduct,
  deleteProduct,
  getAllProduct,
  getDetailProduct,
  updateProduct,
} from "../controllers/ProductController";
import { validBodyRequest } from "../middlewares/validBodyRequest";
import { productRule } from "../rules/productRule";
import { checkAuth } from "../middlewares/checkAuth";
import { checkPerimission } from "../middlewares/checkPermission";

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:slug", getDetailProduct);

productRouter.use(checkAuth, checkPerimission);
productRouter.post("/", validBodyRequest(productRule), createProduct);
productRouter.patch("/:slug", validBodyRequest(productRule), updateProduct);
productRouter.put("/:id/status", changeStatusProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
