import { Router } from "express";
import { validateBody } from "../middlewares/schemaMiddleware";
import {
  createCollectionController,
  listCollectionsByUserIdController,
  listCollectionsByCooperativeIdController,
} from "../controllers/CollectionControllers/index";
import { validateToken } from "../middlewares/tokenValidationMiddleware";

export const collectionRouter = Router();

collectionRouter.use(validateToken);

collectionRouter.post("/", validateBody("createCollection"), (req, res) =>
  createCollectionController().handle(req, res)
);

collectionRouter.get("/user", (req, res) =>
  listCollectionsByUserIdController().handle(req, res)
);

collectionRouter.get("/cooperative", (req, res) =>
  listCollectionsByCooperativeIdController().handle(req, res)
);
