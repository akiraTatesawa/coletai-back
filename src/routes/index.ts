import { Router } from "express";
import { cooperativeRouter } from "./cooperativeRouter";
import { userRouter } from "./userRouter";

export const serverRouter = Router();

serverRouter.use("/users", userRouter);
serverRouter.use("/cooperatives", cooperativeRouter);
