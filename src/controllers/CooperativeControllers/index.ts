import { CooperativeRepository } from "../../repositories/prisma/CooperativeRepository";
import { CreateCooperativeService } from "../../services/CooperativeServices/CreateCooperativeService";
import { CreateCooperativeController } from "./CreateCooperativeController";

function getCooperativeRepo() {
  return new CooperativeRepository();
}

export function createCooperativeController() {
  const repository = getCooperativeRepo();
  const service = new CreateCooperativeService(repository);
  const controller = new CreateCooperativeController(service);

  return controller;
}
