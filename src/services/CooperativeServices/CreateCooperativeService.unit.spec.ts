import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";
import { MockCooperativeRepository } from "../../repositories/prisma/mocks/MockCooperativeRepository";
import { MockCryptUtils } from "../../utils/mocks/MockCryptUtils";
import { CreateCooperativeServiceImpl } from "./CreateCooperativeService";
import { ICryptUtils } from "../../utils/CryptUtils";
import { CooperativeFactory } from "../../../tests/factories/CooperativeFactory";
import { CustomError } from "../../entities/CustomError";
import { GetFullAddressService } from "../NominatimServices/GetFullAddressService";

describe("Create Cooperative Service", () => {
  const repository: ICooperativeRepository = new MockCooperativeRepository();
  const cryptUtils: ICryptUtils = new MockCryptUtils();
  const getFullAddressService: GetFullAddressService = { execute: jest.fn() };

  const service = new CreateCooperativeServiceImpl(
    repository,
    cryptUtils,
    getFullAddressService
  );

  const cooperativeFactory = new CooperativeFactory();

  it("Should be able to create a cooperative", async () => {
    const reqCooperativeData =
      cooperativeFactory.generateReqSignUpCooperativeData();

    jest.spyOn(repository, "findByEmail").mockResolvedValueOnce(null);
    jest.spyOn(repository, "findByName").mockResolvedValueOnce(null);

    await expect(service.execute(reqCooperativeData)).resolves.not.toThrow();
    expect(repository.findByEmail).toHaveBeenCalledWith(
      reqCooperativeData.email
    );
    expect(repository.findByName).toHaveBeenCalledWith(reqCooperativeData.name);
    expect(repository.insert).toHaveBeenCalledTimes(1);
  });

  it("Should not be able to create a cooperative with a non-unique name", async () => {
    const { prismaCooperative, reqCooperative } =
      cooperativeFactory.generatePrismaCooperativeData();

    jest.spyOn(repository, "findByEmail").mockResolvedValueOnce(null);
    jest
      .spyOn(repository, "findByName")
      .mockResolvedValueOnce(prismaCooperative);

    await expect(service.execute(reqCooperative)).rejects.toEqual(
      new CustomError(
        "error_conflict",
        `The cooperative name '${reqCooperative.name}' is already being used`
      )
    );

    expect(repository.findByEmail).toHaveBeenCalledWith(reqCooperative.email);
    expect(repository.findByName).toHaveBeenCalledWith(reqCooperative.name);
    expect(repository.insert).not.toHaveBeenCalled();
  });

  it("Should not be able to create a cooperative with a non-unique email", async () => {
    const { prismaCooperative, reqCooperative } =
      cooperativeFactory.generatePrismaCooperativeData();

    jest
      .spyOn(repository, "findByEmail")
      .mockResolvedValueOnce(prismaCooperative);

    await expect(service.execute(reqCooperative)).rejects.toEqual(
      new CustomError(
        "error_conflict",
        `The email ${reqCooperative.email} is already being used`
      )
    );

    expect(repository.findByEmail).toHaveBeenCalledWith(reqCooperative.email);
    expect(repository.findByName).not.toHaveBeenCalled();
    expect(repository.insert).not.toHaveBeenCalled();
  });
});
