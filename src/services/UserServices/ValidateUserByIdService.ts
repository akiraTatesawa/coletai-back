import { User } from "@prisma/client";
import { IServiceExecute } from "../../@types/ServiceTypes";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CustomError } from "../../entities/CustomError";

type InputUserId = Pick<User, "id">;

export interface ValidateUserByIdService
  extends IServiceExecute<InputUserId, User> {}

export class ValidateUserByIdServiceImpl implements ValidateUserByIdService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async execute({ id }: InputUserId): Promise<User> {
    const user = await this.repository.getById(id);

    if (!user) {
      throw new CustomError("error_not_found", "User not found");
    }

    return user;
  }
}
