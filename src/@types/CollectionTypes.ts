import { Collections } from "@prisma/client";

export type RecyclingType = {
  name: string;
};
export interface CollectionInsertPrisma
  extends Pick<Collections, "cooperativeId" | "userId"> {
  types: RecyclingType[];
}

export interface CollectionRequest {
  types: RecyclingType[];
}

export interface CreateCollectionData extends CollectionRequest {
  userId: string;
}
