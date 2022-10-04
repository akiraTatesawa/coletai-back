import Joi from "joi";
import { CollectionRequest } from "../@types/CollectionTypes";

export const collectionSchema = Joi.object<CollectionRequest>({
  types: Joi.array().min(1).required(),
});
