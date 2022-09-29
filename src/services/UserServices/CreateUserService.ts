import { IServiceExecute } from "../../@types/ServiceTypes";
import { CreateUserPrisma } from "../../@types/UserTypes";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CustomError } from "../../entities/CustomError";

type UserEmail = Pick<CreateUserPrisma, "email">;

export interface ICreateUserService
  extends IServiceExecute<CreateUserPrisma, void> {}

export class CreateUserService implements ICreateUserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  private async isUnique({ email }: UserEmail): Promise<boolean> {
    const user = await this.repository.getByEmail(email);

    if (!user) {
      return true;
    }

    return false;
  }

  async execute(data: CreateUserPrisma): Promise<void> {
    const isEmailUnique = await this.isUnique({ email: data.email });

    if (!isEmailUnique) {
      throw new CustomError(
        "error_conflict",
        `The email ${data.email} is already being used`
      );
    }

    await this.repository.insert(data);
  }
}
