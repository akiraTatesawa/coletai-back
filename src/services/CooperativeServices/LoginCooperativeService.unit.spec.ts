import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";
import { ICryptUtils } from "../../utils/CryptUtils";
import { MockCooperativeRepository } from "../../repositories/prisma/mocks/MockCooperativeRepository";
import { MockCryptUtils } from "../../utils/mocks/MockCryptUtils";
import { JWTUtilsInterface } from "../../utils/JWTUtils";
import { MockJWTUtils } from "../../utils/mocks/MockJWTUtils";
import { CooperativeFactory } from "../../../tests/factories/CooperativeFactory";
import { CustomError } from "../../entities/CustomError";
import {
  ILoginCooperativeService,
  LoginCooperativeService,
} from "./LoginCooperativeService";

describe("Login Cooperative Service", () => {
  const repository: ICooperativeRepository = new MockCooperativeRepository();
  const cryptUtils: ICryptUtils = new MockCryptUtils();
  const jwtUtils: JWTUtilsInterface = new MockJWTUtils();
  const service: ILoginCooperativeService = new LoginCooperativeService(
    repository,
    cryptUtils,
    jwtUtils
  );

  const cooperativeFactory = new CooperativeFactory();

  it("Should be able to login", async () => {
    const { prismaCooperative, reqCooperative } =
      cooperativeFactory.generatePrismaCooperativeData();

    jest
      .spyOn(repository, "findByEmail")
      .mockResolvedValueOnce(prismaCooperative);
    jest.spyOn(cryptUtils, "validateEncryptedData").mockReturnValueOnce(true);
    jest.spyOn(jwtUtils, "createToken").mockReturnValueOnce("token");

    await expect(
      service.execute({
        email: reqCooperative.email,
        password: reqCooperative.password,
      })
    ).resolves.toEqual({ token: "token" });

    expect(repository.findByEmail).toHaveBeenCalledWith(reqCooperative.email);
    expect(cryptUtils.validateEncryptedData).toHaveBeenCalledWith(
      reqCooperative.password,
      prismaCooperative.password
    );
    expect(jwtUtils.createToken).toHaveBeenCalledWith({
      id: prismaCooperative.id,
    });
  });

  it("Should not be able to login if cooperative is not registered", async () => {
    const reqCooperative = cooperativeFactory.generateLoginCooperativeData();

    jest.spyOn(repository, "findByEmail").mockResolvedValueOnce(null);

    await expect(service.execute(reqCooperative)).rejects.toEqual(
      new CustomError("error_not_found", "Cooperative not found")
    );

    expect(repository.findByEmail).toHaveBeenCalledWith(reqCooperative.email);
    expect(cryptUtils.validateEncryptedData).not.toHaveBeenCalled();
    expect(jwtUtils.createToken).not.toHaveBeenCalled();
  });

  it("Should not be able to login if the password is wrong", async () => {
    const { prismaCooperative, reqCooperative } =
      cooperativeFactory.generatePrismaCooperativeData();

    jest
      .spyOn(repository, "findByEmail")
      .mockResolvedValueOnce(prismaCooperative);
    jest.spyOn(cryptUtils, "validateEncryptedData").mockReturnValueOnce(false);

    await expect(
      service.execute({
        email: reqCooperative.email,
        password: reqCooperative.password,
      })
    ).rejects.toEqual(new CustomError("error_unauthorized", "Wrong password"));

    expect(repository.findByEmail).toHaveBeenCalledWith(reqCooperative.email);
    expect(cryptUtils.validateEncryptedData).toHaveBeenCalledWith(
      reqCooperative.password,
      prismaCooperative.password
    );
    expect(jwtUtils.createToken).not.toHaveBeenCalled();
  });
});
