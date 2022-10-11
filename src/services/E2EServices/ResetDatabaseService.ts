import { IServiceExecute } from "../../@types/ServiceTypes";
import { IE2ERepository } from "../../repositories/IE2ERepository";

export interface ResetDatabaseService extends IServiceExecute<void, void> {}

export class ResetDatabaseServiceImpl implements ResetDatabaseService {
  private repository: IE2ERepository;

  constructor(repository: IE2ERepository) {
    this.repository = repository;
  }

  async execute(): Promise<void> {
    await this.repository.reset();
  }
}
