import Joi from "joi";
import { CreateUserPrisma, LoginUser } from "../@types/UserTypes";

export const createUserSchema = Joi.object<CreateUserPrisma>({
  name: Joi.string().trim().required(),
  email: Joi.string().email({ tlds: false }).trim().required(),
  password: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

export const loginUserSchema = Joi.object<LoginUser>({
  email: Joi.string().email({ tlds: false }).trim().required(),
  password: Joi.string().required(),
});
