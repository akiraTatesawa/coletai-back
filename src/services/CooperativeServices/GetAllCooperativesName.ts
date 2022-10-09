import { IServiceExecute } from "../../@types/ServiceTypes";
import { CooperativeLocationName } from "../../@types/CooperativeTypes";
import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";

export interface IGetAllCooperativesName
  extends IServiceExecute<void, CooperativeLocationName[]> {}

export class GetAllCooperativesNameService implements IGetAllCooperativesName {
  private repository: ICooperativeRepository;

  constructor(repository: ICooperativeRepository) {
    this.repository = repository;
  }

  async execute(): Promise<CooperativeLocationName[]> {
    const cooperatives: CooperativeLocationName[] =
      await this.repository.getAllCooperatives();

    return cooperatives;
  }
}
