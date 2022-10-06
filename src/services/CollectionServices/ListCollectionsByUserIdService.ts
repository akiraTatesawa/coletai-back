import { CollectionList } from "../../@types/CollectionTypes";
import { IServiceExecute } from "../../@types/ServiceTypes";
import { ICollectionRepository } from "../../repositories/ICollectionRepository";

export interface IListCollectionsByIUserIdService
  extends IServiceExecute<string, CollectionList[]> {}

export class ListCollectionsByUserIdService
  implements IListCollectionsByIUserIdService
{
  private repository: ICollectionRepository;

  constructor(repository: ICollectionRepository) {
    this.repository = repository;
  }

  async execute(userId: string): Promise<CollectionList[]> {
    const collections = await this.repository.listByUserId(userId);

    return collections;
  }
}
