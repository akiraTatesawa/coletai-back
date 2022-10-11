import { UserRepository } from "../../repositories/prisma/UserRepository";
import { CreateUserServiceImpl } from "../../services/UserServices/CreateUserService";
import { CryptUtils } from "../../utils/CryptUtils";
import { JWTUtils } from "../../utils/JWTUtils";
import { CreateUserController } from "./CreateUserController";
import { LoginUserService } from "../../services/UserServices/LoginUserService";
import { LoginUserController } from "./LoginUserController";
import { GetFullAddressServiceImpl } from "../../services/NominatimServices/GetFullAddressService";

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
  const service = new LoginUserService(repository, cryptUtils, jwtUtils);
  const controller = new LoginUserController(service);

  return controller;
}
