import { Router } from "express";
import { cooperativeRouter } from "./cooperativeRouter";
import { userRouter } from "./userRouter";
import { collectionRouter } from "./collectionRouter";
import { resetRouter } from "./resetRouter";

export const serverRouter = Router();

serverRouter.use("/users", userRouter);
serverRouter.use("/cooperatives", cooperativeRouter);
serverRouter.use("/collections", collectionRouter);

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test") {
  serverRouter.use("/reset-database", resetRouter);
}
