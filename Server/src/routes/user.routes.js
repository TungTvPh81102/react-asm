import express from "express";
import {
  changeStatusUser,
  createUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  updateUser,
} from "../controllers/UserController";
import { validBodyRequest } from "./../middlewares/validBodyRequest";
import { userRule } from "../rules/userRule";
import { checkPerimission } from "../middlewares/checkPermission";
import { checkAuth } from "./../middlewares/checkAuth";

const userRouter = express.Router();

userRouter.use(checkAuth, checkPerimission);

userRouter.get("/", getAllUser);
userRouter.get("/:id", getDetailUser);
userRouter.post("/", validBodyRequest(userRule), createUser);
userRouter.patch("/:id", validBodyRequest(userRule), updateUser);
userRouter.put("/:id/status", changeStatusUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
