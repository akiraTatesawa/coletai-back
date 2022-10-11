import { MockUserRepository } from "../../repositories/prisma/mocks/MockUserRepository";
import {
  ValidateUserByIdService,
  ValidateUserByIdServiceImpl,
} from "./ValidateUserByIdService";
import { UserFactory } from "../../../tests/factories/UserFactory";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CustomError } from "../../entities/CustomError";

describe("Validate User By Id Service", () => {
  const repository: IUserRepository = new MockUserRepository();
  const service: ValidateUserByIdService = new ValidateUserByIdServiceImpl(
    repository
  );
  const factory = new UserFactory();

  it("Should return the user if exists", async () => {
    const { prismaUser } = factory.generatePrismaUserData();

    jest.spyOn(repository, "getById").mockResolvedValueOnce(prismaUser);

    await expect(service.execute({ id: prismaUser.id })).resolves.toEqual(
      prismaUser
    );
    expect(repository.getById).toHaveBeenCalledWith(prismaUser.id);
  });

  it("Should throw an error if user does not exist", async () => {
    const { prismaUser } = factory.generatePrismaUserData();

    jest.spyOn(repository, "getById").mockResolvedValueOnce(null);

    await expect(service.execute({ id: prismaUser.id })).rejects.toEqual(
      new CustomError("error_not_found", "User not found")
    );

    expect(repository.getById).toHaveBeenCalledWith(prismaUser.id);
  });
});
