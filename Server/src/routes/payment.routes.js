import express from "express";
import { createPayment } from "../controllers/PaymentController";

const paymentRouter = express.Router();

paymentRouter.post("/url", createPayment);

export default paymentRouter;
