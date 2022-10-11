import { randUuid } from "@ngneat/falso";
import { ICollectionRepository } from "../../repositories/ICollectionRepository";
import { MockCollectionRepository } from "../../repositories/mocks/MockCollectionRepository";
import {
  ListCollectionsByIdServiceImpl,
  ServiceInput,
} from "./ListCollectionsByIdService";

describe("List all collections by cooperative/user id Service", () => {
  const repository: ICollectionRepository = new MockCollectionRepository();
  const service = new ListCollectionsByIdServiceImpl(repository);

  it("Should be able to list all cooperative collections", async () => {
    const input: ServiceInput = { id: randUuid(), params: "cooperativeId" };

    jest.spyOn(repository, "listAllByAccountId").mockResolvedValueOnce([]);

    await expect(service.execute(input)).resolves.toEqual([]);
    expect(repository.listAllByAccountId).toHaveBeenCalledWith(
      input.params,
      input.id
    );
  });

  it("Should be able to list all user collections", async () => {
    const input: ServiceInput = { id: randUuid(), params: "userId" };

    jest.spyOn(repository, "listAllByAccountId").mockResolvedValueOnce([]);

    await expect(service.execute(input)).resolves.toEqual([]);
    expect(repository.listAllByAccountId).toHaveBeenCalledWith(
      input.params,
      input.id
    );
  });
});
