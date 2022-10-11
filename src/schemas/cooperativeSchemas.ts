import Joi from "joi";
import {
  CreateCooperativeReq,
  LoginCooperative,
} from "../@types/CooperativeTypes";

export const createUserSchema = Joi.object<CreateCooperativeReq>({
  name: Joi.string().trim().required(),
  email: Joi.string().email({ tlds: false }).trim().required(),
  password: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

export const loginCooperativeSchema = Joi.object<LoginCooperative>({
  email: Joi.string().email({ tlds: false }).trim().required(),
  password: Joi.string().required(),
});
