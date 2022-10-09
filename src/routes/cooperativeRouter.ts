import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import {
  getAllCooperativesNameController,
  createCooperativeController,
  loginCooperativeController,
} from "../controllers/CooperativeControllers/index";

export const cooperativeRouter = Router();

cooperativeRouter.post("/", validateBody("createCooperative"), (req, res) =>
  createCooperativeController().handle(req, res)
);

cooperativeRouter.post(
  "/sign-in",
  validateBody("loginCooperative"),
  (req, res) => loginCooperativeController().handle(req, res)
);

cooperativeRouter.get("/name-location", (req, res) =>
  getAllCooperativesNameController().handle(req, res)
);
