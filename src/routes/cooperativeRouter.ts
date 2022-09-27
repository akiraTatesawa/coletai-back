import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { createCooperativeController } from "../controllers/CooperativeControllers/index";

export const cooperativeRouter = Router();

cooperativeRouter.post("/", validateBody("createCooperative"), (req, res) =>
  createCooperativeController().handle(req, res)
);
