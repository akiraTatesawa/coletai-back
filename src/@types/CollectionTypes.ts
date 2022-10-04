import { Collection } from "@prisma/client";

export type RecyclingType = {
  name: string;
};
export interface CollectionInsertPrisma
  extends Pick<Collection, "cooperativeId" | "userId" | "description"> {
  types: RecyclingType[];
}

export interface CollectionRequest {
  description: string;
  types: RecyclingType[];
}

export interface CreateCollectionData extends CollectionRequest {
  userId: string;
}
