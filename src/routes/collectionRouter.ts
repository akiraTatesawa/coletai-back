import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { createCollectionController } from "../controllers/CollectionControllers/index";

export const collectionRouter = Router();

collectionRouter.post("/create", validateBody("createCollection"), (req, res) =>
  createCollectionController().handle(req, res)
);
