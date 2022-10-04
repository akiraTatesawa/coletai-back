import { CollectionInsertPrisma } from "../@types/CollectionTypes";

export interface ICollectionRepository {
  insert(data: CollectionInsertPrisma): Promise<void>;
}
