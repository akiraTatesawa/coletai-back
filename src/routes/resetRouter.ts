import { Router } from "express";
import { resetDatabaseController } from "../controllers/E2EControllers";

export const resetRouter = Router();

resetRouter.delete("/", (req, res) =>
  resetDatabaseController().handle(req, res)
);
