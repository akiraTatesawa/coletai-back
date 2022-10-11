import { IServiceExecute } from "../../@types/ServiceTypes";
import { ICollectionRepository } from "../../repositories/ICollectionRepository";
import { CustomError } from "../../entities/CustomError";

type FinishCollectionReqData = {
  cooperativeId: string;
  collectionId: string;
};

export interface FinishCollectionService
  extends IServiceExecute<FinishCollectionReqData, void> {}

export class FinishCollectionServiceImpl implements FinishCollectionService {
  private repository: ICollectionRepository;

  constructor(repository: ICollectionRepository) {
    this.repository = repository;
  }

  async execute({
    collectionId,
    cooperativeId,
  }: FinishCollectionReqData): Promise<void> {
    const collection = await this.repository.listById(collectionId);

    if (!collection) {
      throw new CustomError("error_not_found", "Collection not found");
    }
    if (collection.cooperativeId !== cooperativeId) {
      throw new CustomError(
        "error_forbidden",
        "You don't have permission to finish this collection"
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

    await this.repository.finishCollection(collectionId);
  }
}
