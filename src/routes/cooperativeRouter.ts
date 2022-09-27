import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";

export const cooperativeRouter = Router();

cooperativeRouter.post("/", validateBody("createCooperative"));
