import { IServiceExecute } from "../../@types/ServiceTypes";
import { CooperativeLocation } from "../../@types/CooperativeTypes";
import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";

export interface GetCooperativesLocationService
  extends IServiceExecute<void, CooperativeLocation[]> {}

export class GetCooperativesLocationServiceImpl
  implements GetCooperativesLocationService
{
  private repository: ICooperativeRepository;

  constructor(repository: ICooperativeRepository) {
    this.repository = repository;
  }

  async execute(): Promise<CooperativeLocation[]> {
    const cooperativesLocations =
      await this.repository.getAllCooperativesLocation();

    return cooperativesLocations;
  }
}
