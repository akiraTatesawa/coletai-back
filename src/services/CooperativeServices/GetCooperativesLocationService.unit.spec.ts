import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";
import { MockCooperativeRepository } from "../../repositories/mocks/MockCooperativeRepository";
import { CooperativeFactory } from "../../../tests/factories/CooperativeFactory";
import { GetCooperativesLocationServiceImpl } from "./GetCooperativesLocationService";

describe("Get Cooperatives location Service", () => {
  const repository: ICooperativeRepository = new MockCooperativeRepository();
  const service = new GetCooperativesLocationServiceImpl(repository);

  const cooperativeFactory = new CooperativeFactory();

  it("Should be able to get all cooperatives location service", async () => {
    const cooperativesLocation =
      cooperativeFactory.generatePrismaCooperativesLocation();

    jest
      .spyOn(repository, "getAllCooperativesLocation")
      .mockResolvedValueOnce(cooperativesLocation);

    await expect(service.execute()).resolves.toEqual(cooperativesLocation);

    expect(repository.getAllCooperativesLocation).toHaveBeenCalledTimes(1);
  });
});
