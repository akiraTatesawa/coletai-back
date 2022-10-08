import { CollectionList } from "../../@types/CollectionTypes";
import { IServiceExecute } from "../../@types/ServiceTypes";
import { ICollectionRepository } from "../../repositories/ICollectionRepository";

export interface ServiceInput {
  params: "userId" | "cooperativeId";
  id: string;
}

export interface IListCollectionsByIdService
  extends IServiceExecute<ServiceInput, CollectionList[]> {}

export class ListCollectionsByIdService implements IListCollectionsByIdService {
  private repository: ICollectionRepository;

  constructor(repository: ICollectionRepository) {
    this.repository = repository;
  }

  async execute({ params, id }: ServiceInput): Promise<CollectionList[]> {
    const collections = await this.repository.listAllByAccountId(params, id);

    return collections;
  }
}
