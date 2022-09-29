import { CooperativeRepository } from "../../repositories/prisma/CooperativeRepository";
import { CreateCooperativeService } from "../../services/CooperativeServices/CreateCooperativeService";
import { CryptUtils } from "../../utils/CryptUtils";
import { CreateCooperativeController } from "./CreateCooperativeController";

function getCooperativeRepo() {
  return new CooperativeRepository();
}

function getUtils() {
  const cryptUtils = new CryptUtils();

  return { cryptUtils };
}

export function createCooperativeController() {
  const repository = getCooperativeRepo();
  const { cryptUtils } = getUtils();
  const service = new CreateCooperativeService(repository, cryptUtils);
  const controller = new CreateCooperativeController(service);

  return controller;
}
