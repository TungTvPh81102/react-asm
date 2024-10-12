import express from "express";
import {
  changeStatusCategory,
  createCategory,
  deleteCategory,
  getAllCategory,
  getDetailCategory,
  updateCategory,
} from "../controllers/CategoryController";
import { validBodyRequest } from "../middlewares/validBodyRequest";
import { categoryRule } from "../rules/categoryRule";
import { checkAuth } from "../middlewares/checkAuth";
import { checkPerimission } from "../middlewares/checkPermission";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getDetailCategory);

categoryRouter.use(checkAuth, checkPerimission);
categoryRouter.post("/", validBodyRequest(categoryRule), createCategory);
categoryRouter.patch("/:id", validBodyRequest(categoryRule), updateCategory);
categoryRouter.put("/:id/status", changeStatusCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
