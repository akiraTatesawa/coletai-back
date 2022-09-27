import { UserRepository } from "../../repositories/prisma/UserRepository";
import { CreateUserService } from "../../services/UserServices/CreateUserService";
import { CreateUserController } from "./CreateUserController";

function getUserRepo() {
  return new UserRepository();
}

export function createUserController() {
  const repository = getUserRepo();
  const service = new CreateUserService(repository);
  const controller = new CreateUserController(service);

  return controller;
}
