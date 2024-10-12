import { Router } from "express";
import categoryRouter from "./category.routes";
import productRouter from "./product.routes";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import cartRouter from "./cart.routes";
import paymentRouter from "./payment.routes";
import orderRouter from "./order.routes";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);

export default router;
