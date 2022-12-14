import { IUserRepository } from "../../repositories/IUserRepository";
import { MockUserRepository } from "../../repositories/mocks/MockUserRepository";
import { LoginUserService, LoginUserServiceImpl } from "./LoginUserService";
import { JWTUtilsInterface } from "../../utils/JWTUtils";
import { MockJWTUtils } from "../../utils/mocks/MockJWTUtils";
import { ICryptUtils } from "../../utils/CryptUtils";
import { UserFactory } from "../../../tests/factories/UserFactory";
import { CustomError } from "../../entities/CustomError";
import { MockCryptUtils } from "../../utils/mocks/MockCryptUtils";

describe("Login User Service", () => {
  const repository: IUserRepository = new MockUserRepository();
  const jwtUtils: JWTUtilsInterface = new MockJWTUtils();
  const cryptUtils: ICryptUtils = new MockCryptUtils();
  const service: LoginUserService = new LoginUserServiceImpl(
    repository,
    cryptUtils,
    jwtUtils
  );

  const userFactory = new UserFactory();

  it("Should be able to login an user", async () => {
    const { prismaUser, reqUser } = userFactory.generatePrismaUserData();

    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce(prismaUser);
    jest.spyOn(cryptUtils, "validateEncryptedData").mockReturnValueOnce(true);
    jest.spyOn(jwtUtils, "createToken").mockReturnValueOnce("token");

    await expect(
      service.execute({ email: reqUser.email, password: reqUser.password })
    ).resolves.toEqual({ token: "token" });

    expect(repository.getByEmail).toHaveBeenCalledWith(reqUser.email);
    expect(jwtUtils.createToken).toHaveBeenCalledWith({ id: prismaUser.id });
  });

  it("Should not be able to login an user that is not registered", async () => {
    const reqUser = userFactory.generateReqLoginUserData();

    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce(null);

    await expect(service.execute(reqUser)).rejects.toEqual(
      new CustomError("error_not_found", "User not found")
    );

    expect(repository.getByEmail).toHaveBeenCalledWith(reqUser.email);
    expect(jwtUtils.createToken).not.toHaveBeenCalled();
  });

  it("Should not be able to login an user if the password is incorrect", async () => {
    const { prismaUser, reqUser } = userFactory.generatePrismaUserData();

    jest.spyOn(repository, "getByEmail").mockResolvedValueOnce(prismaUser);
    jest.spyOn(cryptUtils, "validateEncryptedData").mockReturnValueOnce(false);

    await expect(
      service.execute({ email: reqUser.email, password: "wrong pass" })
    ).rejects.toEqual(new CustomError("error_unauthorized", "Wrong password"));

    expect(repository.getByEmail).toHaveBeenCalledWith(reqUser.email);
    expect(jwtUtils.createToken).not.toHaveBeenCalled();
  });
});
