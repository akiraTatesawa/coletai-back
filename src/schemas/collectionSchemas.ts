import Joi from "joi";
import { CollectionRequest } from "../@types/CollectionTypes";

export const collectionSchema = Joi.object<CollectionRequest>({
  userId: Joi.string().required(),
  cooperativeId: Joi.string().required(),
  types: Joi.array().min(1).required(),
});
