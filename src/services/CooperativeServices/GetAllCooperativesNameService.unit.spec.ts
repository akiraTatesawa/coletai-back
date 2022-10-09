import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";
import { MockCooperativeRepository } from "../../repositories/prisma/mocks/MockCooperativeRepository";
import { GetAllCooperativesNameService } from "./GetAllCooperativesNameService";
import { CooperativeFactory } from "../../../tests/factories/CooperativeFactory";

describe("Get All Cooperatives Name and Location Service", () => {
  const repository: ICooperativeRepository = new MockCooperativeRepository();
  const service = new GetAllCooperativesNameService(repository);

  it("Should be able to get all cooperatives names and locations", async () => {
    const cooperatives =
      new CooperativeFactory().generatePrismaCooperativesNamesLocations();

    jest
      .spyOn(repository, "getAllCooperatives")
      .mockResolvedValueOnce(cooperatives);

    await expect(service.execute()).resolves.toEqual(cooperatives);
    expect(repository.getAllCooperatives).toHaveBeenCalledTimes(1);
  });
});
