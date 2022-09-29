import { IServiceExecute } from "../../@types/ServiceTypes";
import { CreateUserPrisma } from "../../@types/UserTypes";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CustomError } from "../../entities/CustomError";
import { ICryptUtils } from "../../utils/CryptUtils";
import { User } from "../../entities/User";

type UserEmail = Pick<CreateUserPrisma, "email">;

export interface ICreateUserService
  extends IServiceExecute<CreateUserPrisma, void> {}

export class CreateUserService implements ICreateUserService {
  private repository: IUserRepository;

  private cryptUtils: ICryptUtils;

  constructor(repository: IUserRepository, cryptUtils: ICryptUtils) {
    this.repository = repository;
    this.cryptUtils = cryptUtils;
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

    const user = new User(data, this.cryptUtils);

    await this.repository.insert(user);
  }
}
