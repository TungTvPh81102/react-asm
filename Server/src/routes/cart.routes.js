import express from "express";
import { create, getAll, removeCart } from "../controllers/CartController";
import { checkAuth } from "../middlewares/checkAuth";
import { validBodyRequest } from "../middlewares/validBodyRequest";
import { cartRule } from "../rules/cartRule";

const cartRouter = express.Router();

cartRouter.use(checkAuth);
cartRouter.get("/view-cart", getAll);
cartRouter.post("/add-cart", validBodyRequest(cartRule), create);
cartRouter.post("/remove-cart", removeCart);

export default cartRouter;
