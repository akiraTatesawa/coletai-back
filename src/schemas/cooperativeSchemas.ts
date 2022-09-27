import Joi from "joi";
import { CreateCooperativeData } from "../@types/CooperativeTypes";

export const createUserSchema = Joi.object<CreateCooperativeData>({
  name: Joi.string().trim().required(),
  email: Joi.string().email({ tlds: false }).trim().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  uf: Joi.string().length(2).required(),
  city: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.string().required(),
});
