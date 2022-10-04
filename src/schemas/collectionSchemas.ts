import Joi from "joi";
import { CollectionRequest } from "../@types/CollectionTypes";

export const collectionSchema = Joi.object<CollectionRequest>({
  description: Joi.string().max(140).required(),
  types: Joi.array().min(1).required(),
});
