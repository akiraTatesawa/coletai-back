import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import { createCollectionController } from "../controllers/CollectionControllers/index";
import { validateToken } from "../middlewares/tokenValidationMiddleware";

export const collectionRouter = Router();

collectionRouter.use(validateToken);

collectionRouter.post("/", validateBody("createCollection"), (req, res) =>
  createCollectionController().handle(req, res)
);
