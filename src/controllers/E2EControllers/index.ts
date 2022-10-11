import { E2ERepository } from "../../repositories/prisma/E2ERepository";

import { ResetDatabaseServiceImpl } from "../../services/E2EServices/ResetDatabaseService";

import { ResetDatabaseController } from "./ResetDatabaseController";

export function resetDatabaseController() {
  const repository = new E2ERepository();
  const service = new ResetDatabaseServiceImpl(repository);

  return new ResetDatabaseController(service);
}
