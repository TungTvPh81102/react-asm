import express from "express";
import {
  create,
  getAll,
  getDetail,
  getOrdersByUser,
  update,
} from "../controllers/OrderController";
import { validBodyRequest } from "./../middlewares/validBodyRequest";
import orderRule from "../rules/orderRule";
import { checkAuth } from "./../middlewares/checkAuth";

const orderRouter = express.Router();

orderRouter.get("/", getAll);
orderRouter.get("/:id", getDetail);
// orderRouter.post("/my-orders", checkAuth, getOrdersByUser);
orderRouter.post("/", validBodyRequest(orderRule), create);
orderRouter.patch("/:id", update);

export default orderRouter;
