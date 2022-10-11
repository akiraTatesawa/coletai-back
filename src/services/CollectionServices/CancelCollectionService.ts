import { IServiceExecute } from "../../@types/ServiceTypes";
import { CustomError } from "../../entities/CustomError";

import { ICollectionRepository } from "../../repositories/ICollectionRepository";

type CancelCollectionReqData = {
  cooperativeId: string;
  collectionId: string;
};

export interface CancelCollectionService
  extends IServiceExecute<CancelCollectionReqData, void> {}

export class CancelCollectionServiceImpl implements CancelCollectionService {
  private repository: ICollectionRepository;

  constructor(repository: ICollectionRepository) {
    this.repository = repository;
  }

  async execute({
    collectionId,
    cooperativeId,
  }: CancelCollectionReqData): Promise<void> {
    const collection = await this.repository.listById(collectionId);

    if (!collection) {
      throw new CustomError("error_not_found", "Collection not found");
    }
    if (collection.cooperativeId !== cooperativeId) {
      throw new CustomError(
        "error_forbidden",
        "You don't have permission to cancel this collection"
      );
    }
    if (collection.status === "cancelled") {
      throw new CustomError(
        "error_bad_request",
        "This collection is already cancelled"
      );
    }
    if (collection.status === "finished") {
      throw new CustomError(
        "error_bad_request",
        "This collection is already finished"
      );
    }

    await this.repository.cancelCollection(collectionId);
  }
}
