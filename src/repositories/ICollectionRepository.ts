import { CollectionRequest } from "../@types/CollectionTypes";

export interface ICollectionRepository {
  insert(data: CollectionRequest): Promise<void>;
}
