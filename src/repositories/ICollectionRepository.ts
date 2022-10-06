import {
  CollectionInsertPrisma,
  CollectionList,
} from "../@types/CollectionTypes";

export interface ICollectionRepository {
  insert(data: CollectionInsertPrisma): Promise<void>;
  listByUserId(userId: string): Promise<CollectionList[]>;
}
