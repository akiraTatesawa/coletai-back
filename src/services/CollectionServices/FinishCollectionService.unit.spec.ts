import { randUuid } from "@ngneat/falso";
import { ICollectionRepository } from "../../repositories/ICollectionRepository";
import { MockCollectionRepository } from "../../repositories/mocks/MockCollectionRepository";
import { FinishCollectionServiceImpl } from "./FinishCollectionService";
import { CollectionFactory } from "../../../tests/factories/CollectionFactory";
import { CustomError } from "../../entities/CustomError";

describe("Finish Collection Service", () => {
  const repository: ICollectionRepository = new MockCollectionRepository();
  const service = new FinishCollectionServiceImpl(repository);

  it("Should be able to finish a collection", async () => {
    const cooperativeId = randUuid();
    const collectionId = randUuid();
    const collectionFromPrisma =
      new CollectionFactory().generateCollectionFromPrisma({
        id: collectionId,
        cooperativeId,
      });

    jest
      .spyOn(repository, "listById")
      .mockResolvedValueOnce(collectionFromPrisma);

    await expect(
      service.execute({ collectionId, cooperativeId })
    ).resolves.not.toThrow();

    expect(repository.listById).toHaveBeenCalledWith(collectionId);
    expect(repository.finishCollection).toHaveBeenCalledWith(collectionId);
  });

  it("Should not be able to finish a collection if it does not exist", async () => {
    const cooperativeId = randUuid();
    const collectionId = randUuid();

    jest.spyOn(repository, "listById").mockResolvedValueOnce(null);

    await expect(
      service.execute({ collectionId, cooperativeId })
    ).rejects.toEqual(
      new CustomError("error_not_found", "Collection not found")
    );

    expect(repository.listById).toHaveBeenCalledWith(collectionId);
    expect(repository.finishCollection).not.toHaveBeenCalled();
  });

  it("Should not be ble to finish a collection if it does not belong to the cooperative", async () => {
    const cooperativeId = randUuid();
    const collectionId = randUuid();
    const collectionFromPrisma =
      new CollectionFactory().generateCollectionFromPrisma({
        id: collectionId,
      });

    jest
      .spyOn(repository, "listById")
      .mockResolvedValueOnce(collectionFromPrisma);

    await expect(
      service.execute({ collectionId, cooperativeId })
    ).rejects.toEqual(
      new CustomError(
        "error_forbidden",
        "You don't have permission to finish this collection"
      )
    );

    expect(repository.listById).toHaveBeenCalledWith(collectionId);
    expect(repository.finishCollection).not.toHaveBeenCalled();
  });

  it("Should not be able to finish a collection if its already cancelled", async () => {
    const cooperativeId = randUuid();
    const collectionId = randUuid();
    const collectionFromPrisma =
      new CollectionFactory().generateCollectionFromPrisma({
        id: collectionId,
        cooperativeId,
        status: "cancelled",
      });

    jest
      .spyOn(repository, "listById")
      .mockResolvedValueOnce(collectionFromPrisma);

    await expect(
      service.execute({ collectionId, cooperativeId })
    ).rejects.toEqual(
      new CustomError(
        "error_bad_request",
        "This collection is already cancelled"
      )
    );

    expect(repository.listById).toHaveBeenCalledWith(collectionId);
    expect(repository.finishCollection).not.toHaveBeenCalled();
  });

  it("Should not be able to finish a collection if its already finished", async () => {
    const cooperativeId = randUuid();
    const collectionId = randUuid();
    const collectionFromPrisma =
      new CollectionFactory().generateCollectionFromPrisma({
        id: collectionId,
        cooperativeId,
        status: "finished",
      });

    jest
      .spyOn(repository, "listById")
      .mockResolvedValueOnce(collectionFromPrisma);

    await expect(
      service.execute({ collectionId, cooperativeId })
    ).rejects.toEqual(
      new CustomError(
        "error_bad_request",
        "This collection is already finished"
      )
    );

    expect(repository.listById).toHaveBeenCalledWith(collectionId);
    expect(repository.finishCollection).not.toHaveBeenCalled();
  });
});
