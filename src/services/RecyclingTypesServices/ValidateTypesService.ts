import { IServiceExecute } from "../../@types/ServiceTypes";
import { RecyclingType } from "../../@types/CollectionTypes";
import { IRecyclingTypesRepository } from "../../repositories/IRecyclingTypesRepository";
import { CustomError } from "../../entities/CustomError";

export interface IValidateTypesService
  extends IServiceExecute<RecyclingType[], void> {}

export class ValidateTypesService implements IValidateTypesService {
  private repository: IRecyclingTypesRepository;

  constructor(repository: IRecyclingTypesRepository) {
    this.repository = repository;
  }

  async execute(reqTypes: RecyclingType[]): Promise<void> {
    const databaseTypes = await this.repository.getAll();

    const recyclingTypesHash: { [key: string]: boolean } = {};

    for (let i = 0; i < databaseTypes.length; i++) {
      const type = databaseTypes[i].name;
      recyclingTypesHash[type] = true;
    }

    for (let j = 0; j < reqTypes.length; j++) {
      if (!recyclingTypesHash[reqTypes[j].name]) {
        throw new CustomError(
          "error_not_found",
          `Recycling type "${reqTypes[j].name}" not found`
        );
      }
    }
  }
}
