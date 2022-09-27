import { Router } from "express";
import { userRouter } from "./userRouter";

export const serverRouter = Router();

serverRouter.use("/users", userRouter);
