import { CreateCollectionService } from "./CreateCollectionService";
import { IValidateUserByIdService } from "../UserServices/ValidateUserByIdService";
import { IGetCooperativesLocationService } from "../CooperativeServices/GetCooperativesLocationService";
import { IValidateTypesService } from "../RecyclingTypesServices/ValidateTypesService";
import { ICollectionRepository } from "../../repositories/ICollectionRepository";
import { MockCollectionRepository } from "../../repositories/prisma/mocks/MockCollectionRepository";
import { UserFactory } from "../../../tests/factories/UserFactory";
import { CooperativeFactory } from "../../../tests/factories/CooperativeFactory";
import { CollectionFactory } from "../../../tests/factories/CollectionFactory";

describe("Create Collection Service", () => {
  const validateUserByIdService: IValidateUserByIdService = {
    execute: jest.fn(),
  };
  const getCooperativesLocationService: IGetCooperativesLocationService = {
    execute: jest.fn(),
  };
  const validateRecyclingTypesService: IValidateTypesService = {
    execute: jest.fn(),
  };
  const repository: ICollectionRepository = new MockCollectionRepository();

  const service = new CreateCollectionService(
    validateUserByIdService,
    getCooperativesLocationService,
    validateRecyclingTypesService,
    repository
  );

  const userFactory = new UserFactory();
  const cooperativeFactory = new CooperativeFactory();
  const collectionFactory = new CollectionFactory();

  it("Should be able to create a collection", async () => {
    const { prismaUser } = userFactory.generatePrismaUserData();
    const cooperativesLocation =
      cooperativeFactory.generatePrismaCooperativesLocation();
    const { collection, collectionReq } =
      collectionFactory.generateCollectionEntity();

    jest
      .spyOn(validateUserByIdService, "execute")
      .mockResolvedValueOnce(prismaUser);
    jest
      .spyOn(validateRecyclingTypesService, "execute")
      .mockResolvedValueOnce();
    jest
      .spyOn(getCooperativesLocationService, "execute")
      .mockResolvedValueOnce([cooperativesLocation[0]]);
    jest.spyOn(repository, "insert").mockResolvedValueOnce();

    await expect(service.execute(collectionReq)).resolves.not.toThrow();
    expect(validateUserByIdService.execute).toHaveBeenCalledWith({
      id: collectionReq.userId,
    });
    expect(validateRecyclingTypesService.execute).toHaveBeenCalledWith(
      collectionReq.types
    );
    expect(getCooperativesLocationService.execute).toHaveBeenCalled();
    expect(repository.insert).toHaveBeenCalledWith({
      ...collection,
      userId: prismaUser.id,
      cooperativeId: cooperativesLocation[0].id,
    });
  });
});
