import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { createUserController } from "../controllers/UserControllers/index";

export const userRouter = Router();

userRouter.post("/", validateBody("createUser"), (req, res) =>
  createUserController().handle(req, res)
);
