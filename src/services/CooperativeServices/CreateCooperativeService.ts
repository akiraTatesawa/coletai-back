import { IServiceExecute } from "../../@types/ServiceTypes";
import { CreateCooperativePrisma } from "../../@types/CooperativeTypes";
import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";
import { CustomError } from "../../entities/CustomError";

type CooperativeEmail = Pick<CreateCooperativePrisma, "email">;
type CooperativeName = Pick<CreateCooperativePrisma, "name">;

export interface ICreateCooperativeService
  extends IServiceExecute<CreateCooperativePrisma, void> {}

export class CreateCooperativeService implements ICreateCooperativeService {
  private repository: ICooperativeRepository;

  constructor(repository: ICooperativeRepository) {
    this.repository = repository;
  }

  async isEmailUnique({ email }: CooperativeEmail): Promise<boolean> {
    const cooperative = await this.repository.findByEmail(email);
    if (cooperative) {
      return false;
    }
    return true;
  }

  async isNameUnique({ name }: CooperativeName): Promise<boolean> {
    const cooperative = await this.repository.findByName(name);
    if (cooperative) {
      return false;
    }
    return true;
  }

  async execute(data: CreateCooperativePrisma): Promise<void> {
    const isEmailUnique = await this.isEmailUnique({ email: data.email });
    if (!isEmailUnique) {
      throw new CustomError(
        "error_conflict",
        `The email ${data.email} is already being used`
      );
    }

    const isNameUnique = await this.isNameUnique({ name: data.name });
    if (!isNameUnique) {
      throw new CustomError(
        "error_conflict",
        `The cooperative name '${data.name}' is already being used`
      );
    }
    await this.repository.insert(data);
  }
}
