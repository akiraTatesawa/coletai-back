import { Collections } from "@prisma/client";
import { CollectionInsertPrisma } from "../@types/CollectionTypes";

export interface ICollectionRepository {
  insert(data: CollectionInsertPrisma): Promise<Collections>;
}
