import {
  CollectionInsertPrisma,
  CollectionList,
} from "../@types/CollectionTypes";

export interface ICollectionRepository {
  insert(data: CollectionInsertPrisma): Promise<void>;
  listByAccountId(
    params: "userId" | "cooperativeId",
    id: string
  ): Promise<CollectionList[]>;
  cancelCollection(id: string): Promise<void>;
}
