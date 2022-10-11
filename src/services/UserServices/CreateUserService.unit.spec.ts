import { MockUserRepository } from "../../repositories/mocks/MockUserRepository";
import { CreateUserServiceImpl } from "./CreateUserService";
import { MockCryptUtils } from "../../utils/mocks/MockCryptUtils";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICryptUtils } from "../../utils/CryptUtils";
import { UserFactory } from "../../../tests/factories/UserFactory";
import { CustomError } from "../../entities/CustomError";
import { GetFullAddressService } from "../NominatimServices/GetFullAddressService";

describe("Create User Service", () => {
  const userRepository: IUserRepository = new MockUserRepository();
  const cryptUtils: ICryptUtils = new MockCryptUtils();
  const getFullAddressService: GetFullAddressService = { execute: jest.fn() };

  const service = new CreateUserServiceImpl(
    userRepository,
    cryptUtils,
    getFullAddressService
  );

  const userFactory = new UserFactory();

  it("Should be able to create an user", async () => {
    const user = userFactory.generateReqSignUpUserData();

    jest.spyOn(userRepository, "insert").mockResolvedValueOnce();

    await expect(service.execute(user)).resolves.not.toThrow();
    expect(userRepository.insert).toHaveBeenCalledTimes(1);
  });

  it("Should not be able to create an user with a non-unique email", async () => {
    const { prismaUser, reqUser } = userFactory.generatePrismaUserData();

    jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce(prismaUser);

    await expect(service.execute(reqUser)).rejects.toEqual(
      new CustomError(
        "error_conflict",
        `The email ${reqUser.email} is already being used`
      )
    );

    expect(userRepository.getByEmail).toHaveBeenCalledWith(reqUser.email);
    expect(userRepository.insert).not.toHaveBeenCalled();
  });
});
