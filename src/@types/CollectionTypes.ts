import { Collections } from "@prisma/client";

export type RecyclingType = {
  name: string;
};

type CollectionRequestData = Pick<Collections, "userId">;

export interface CollectionInsertPrisma
  extends Pick<Collections, "cooperativeId" | "userId"> {
  types: RecyclingType[];
}

export interface CollectionRequest extends CollectionRequestData {
  types: RecyclingType[];
}

export interface CollectionResponse extends Collections {
  types: RecyclingType[];
}
