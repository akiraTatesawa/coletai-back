import { Collection } from "@prisma/client";
import {
  CollectionInsertPrisma,
  CollectionList,
} from "../@types/CollectionTypes";

export interface ICollectionRepository {
  insert(data: CollectionInsertPrisma): Promise<void>;
  listAllByAccountId(
    params: "userId" | "cooperativeId",
    id: string
  ): Promise<CollectionList[]>;
  cancelCollection(id: string): Promise<void>;
  listById(id: string): Promise<Collection | null>;
}
