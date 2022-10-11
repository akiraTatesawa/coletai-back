import { UserRepository } from "../../repositories/prisma/UserRepository";

import { CryptUtils } from "../../utils/CryptUtils";
import { JWTUtils } from "../../utils/JWTUtils";

import { LoginUserServiceImpl } from "../../services/UserServices/LoginUserService";
import { CreateUserServiceImpl } from "../../services/UserServices/CreateUserService";
import { GetFullAddressServiceImpl } from "../../services/NominatimServices/GetFullAddressService";

import { CreateUserController } from "./CreateUserController";
import { LoginUserController } from "./LoginUserController";

function getUserRepo() {
  return new UserRepository();
}

function getUtils() {
  const cryptUtils = new CryptUtils();
  const jwtUtils = new JWTUtils(process.env.JWT_SECRET);

  return { cryptUtils, jwtUtils };
}

export function createUserController() {
  const repository = getUserRepo();
  const { cryptUtils } = getUtils();
  const getFullAddressService = new GetFullAddressServiceImpl();

  const service = new CreateUserServiceImpl(
    repository,
    cryptUtils,
    getFullAddressService
  );

  return new CreateUserController(service);
}

export function loginUserController() {
  const repository = getUserRepo();
  const { cryptUtils, jwtUtils } = getUtils();
  const service = new LoginUserServiceImpl(repository, cryptUtils, jwtUtils);

  return new LoginUserController(service);
}
