import { IServiceExecute } from "../../@types/ServiceTypes";
import { CreateUserData } from "../../@types/UserTypes";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CustomError } from "../../entities/CustomError";

type UserEmail = Pick<CreateUserData, "email">;
type UserPasswords = Pick<CreateUserData, "confirmPassword" | "password">;

export interface ICreateUserService
  extends IServiceExecute<CreateUserData, void> {}

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

  private isPasswordsMatching({
    confirmPassword,
    password,
  }: UserPasswords): boolean {
    if (confirmPassword === password) {
      return true;
    }
    return false;
  }

  async execute({ confirmPassword, ...data }: CreateUserData): Promise<void> {
    const isEmailUnique = await this.isUnique({ email: data.email });

    if (!isEmailUnique) {
      throw new CustomError(
        "error_conflict",
        `The email ${data.email} is already being used`
      );
    }

    const isMatching = this.isPasswordsMatching({
      confirmPassword,
      password: data.password,
    });

    if (!isMatching) {
      throw new CustomError("error_bad_request", "Passwords don't match");
    }

    await this.repository.insert(data);
  }
}
