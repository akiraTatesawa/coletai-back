import { RecyclingTypes } from "@prisma/client";
import { MockRecyclingTypesRepository } from "../../repositories/prisma/mocks/MockRecyclingTypesRepository";
import {
  ValidateTypesService,
  ValidateTypesServiceImpl,
} from "./ValidateTypesService";
import { IRecyclingTypesRepository } from "../../repositories/IRecyclingTypesRepository";
import { RecyclingTypesFactory } from "../../../tests/factories/RecyclingTypesFactory";
import { CustomError } from "../../entities/CustomError";

describe("Validate Recycling Types Service", () => {
  const repository: IRecyclingTypesRepository =
    new MockRecyclingTypesRepository();
  const service: ValidateTypesService = new ValidateTypesServiceImpl(
    repository
  );
  const recyclingTypesFactory = new RecyclingTypesFactory();

  it("Should validate all the types without throwing an error", async () => {
    const types: RecyclingTypes[] = recyclingTypesFactory.generateTypes();
    const reqTypes = recyclingTypesFactory.generateValidType();

    jest.spyOn(repository, "getAll").mockResolvedValueOnce(types);

    await expect(service.execute(reqTypes)).resolves.not.toThrow();
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });

  it("Should throw an error if there is an invalid type", async () => {
    const types: RecyclingTypes[] = recyclingTypesFactory.generateTypes();
    const invalidReqType = recyclingTypesFactory.generateInvalidType();

    jest.spyOn(repository, "getAll").mockResolvedValueOnce(types);

    await expect(service.execute(invalidReqType)).rejects.toEqual(
      new CustomError(
        "error_not_found",
        `Recycling type "${invalidReqType[0].name}" not found`
      )
    );

    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });
});
