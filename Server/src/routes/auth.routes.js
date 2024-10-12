import express from "express";
import { validBodyRequest } from "../middlewares/validBodyRequest";
import { signIn, signUp } from "../controllers/auth/AuthController";
import { signInSchema, signUpSchema } from "../rules/authRule";

const authRouter = express.Router();

authRouter.post("/sign-up", validBodyRequest(signUpSchema), signUp);
authRouter.post("/sign-in", validBodyRequest(signInSchema), signIn);

export default authRouter;
