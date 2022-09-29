import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import {
  createUserController,
  loginUserController,
} from "../controllers/UserControllers/index";

export const userRouter = Router();

userRouter.post("/", validateBody("createUser"), (req, res) =>
  createUserController().handle(req, res)
);

userRouter.post("/sign-in", validateBody("loginUser"), (req, res) =>
  loginUserController().handle(req, res)
);
