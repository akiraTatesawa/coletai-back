import { Router } from "express";
import { cooperativeRouter } from "./cooperativeRouter";
import { userRouter } from "./userRouter";
import { collectionRouter } from "./collectionRouter";

export const serverRouter = Router();

serverRouter.use("/users", userRouter);
serverRouter.use("/cooperatives", cooperativeRouter);
serverRouter.use("/collections", collectionRouter);
