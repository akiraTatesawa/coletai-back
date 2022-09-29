import { CooperativeRepository } from "../../repositories/prisma/CooperativeRepository";
import { CreateCooperativeService } from "../../services/CooperativeServices/CreateCooperativeService";
import { CryptUtils } from "../../utils/CryptUtils";
import { CreateCooperativeController } from "./CreateCooperativeController";
import { LoginCooperativeService } from "../../services/CooperativeServices/LoginCooperativeService";
import { JWTUtils } from "../../utils/JWTUtils";
import { LoginCooperativeController } from "./LoginCooperativeController";

function getCooperativeRepo() {
  return new CooperativeRepository();
}

function getUtils() {
  const cryptUtils = new CryptUtils();
  const jwtUtils = new JWTUtils(process.env.JWT_SECRET);

  return { cryptUtils, jwtUtils };
}

export function createCooperativeController() {
  const repository = getCooperativeRepo();
  const { cryptUtils } = getUtils();
  const service = new CreateCooperativeService(repository, cryptUtils);
  const controller = new CreateCooperativeController(service);

  return controller;
}

export function loginCooperativeController() {
  const repository = getCooperativeRepo();
  const { cryptUtils, jwtUtils } = getUtils();
  const service = new LoginCooperativeService(repository, cryptUtils, jwtUtils);
  const controller = new LoginCooperativeController(service);

  return controller;
}
