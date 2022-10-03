import { IServiceExecute } from "../../@types/ServiceTypes";
import { CooperativeLocation } from "../../@types/CooperativeTypes";
import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";

export interface IGetCooperativesLocationService
  extends IServiceExecute<void, CooperativeLocation[]> {}

export class GetCooperativesLocationService
  implements IGetCooperativesLocationService
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
