import { UserRepository } from "../../repositories/prisma/UserRepository";
import { CreateUserService } from "../../services/UserServices/CreateUserService";
import { CryptUtils } from "../../utils/CryptUtils";
import { CreateUserController } from "./CreateUserController";

function getUserRepo() {
  return new UserRepository();
}

function getUtils() {
  const cryptUtils = new CryptUtils();

  return { cryptUtils };
}

export function createUserController() {
  const repository = getUserRepo();
  const { cryptUtils } = getUtils();
  const service = new CreateUserService(repository, cryptUtils);
  const controller = new CreateUserController(service);

  return controller;
}
