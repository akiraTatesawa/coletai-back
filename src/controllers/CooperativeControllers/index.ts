import { CooperativeRepository } from "../../repositories/prisma/CooperativeRepository";

import { CryptUtils } from "../../utils/CryptUtils";
import { JWTUtils } from "../../utils/JWTUtils";

import { CreateCooperativeServiceImpl } from "../../services/CooperativeServices/CreateCooperativeService";
import { LoginCooperativeServiceImpl } from "../../services/CooperativeServices/LoginCooperativeService";
import { GetAllCooperativesNameServiceImpl } from "../../services/CooperativeServices/GetAllCooperativesNameService";
import { GetFullAddressServiceImpl } from "../../services/NominatimServices/GetFullAddressService";

import { CreateCooperativeController } from "./CreateCooperativeController";
import { LoginCooperativeController } from "./LoginCooperativeController";
import { GetAllCooperativesNameController } from "./GetAllCooperativesNameController";

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
  const getFullAddressService = new GetFullAddressServiceImpl();

  const service = new CreateCooperativeServiceImpl(
    repository,
    cryptUtils,
    getFullAddressService
  );

  return new CreateCooperativeController(service);
}

export function loginCooperativeController() {
  const repository = getCooperativeRepo();
  const { cryptUtils, jwtUtils } = getUtils();
  const service = new LoginCooperativeServiceImpl(
    repository,
    cryptUtils,
    jwtUtils
  );
  return new LoginCooperativeController(service);
}

export function getAllCooperativesNameController() {
  const repository = getCooperativeRepo();
  const service = new GetAllCooperativesNameServiceImpl(repository);

  return new GetAllCooperativesNameController(service);
}
