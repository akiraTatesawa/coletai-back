import Joi from "joi";
import { CreateUserData } from "../@types/UserTypes";

export const createUserSchema = Joi.object<CreateUserData>({
  username: Joi.string().trim().required(),
  email: Joi.string().email({ tlds: false }).trim().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  uf: Joi.string().length(2).required(),
  city: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});
