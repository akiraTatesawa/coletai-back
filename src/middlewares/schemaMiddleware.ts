import { NextFunction, Request, Response } from "express";
import {
  createUserSchema as createUser,
  loginUserSchema as loginUser,
} from "../schemas/userSchemas";
import {
  createUserSchema as createCooperative,
  loginCooperativeSchema as loginCooperative,
} from "../schemas/cooperativeSchemas";
import { collectionSchema as createCollection } from "../schemas/collectionSchemas";

import { CustomError } from "../entities/CustomError";

const Schemas = {
  createUser,
  loginUser,
  createCooperative,
  loginCooperative,
  createCollection,
};

type Validator = keyof typeof Schemas;

export function validateBody(
  validator: Validator
): (req: Request, _res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const { error } = Schemas[validator].validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join("; ");
      throw new CustomError("error_unprocessable_entity", message);
    }

    return next();
  };
}
