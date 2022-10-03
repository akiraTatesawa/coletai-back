import { Collections } from "@prisma/client";

type CollectionRequestData = Pick<Collections, "userId" | "cooperativeId">;

type RecyclingType = {
  name: string;
};

export interface CollectionRequest extends CollectionRequestData {
  types: RecyclingType[];
}

export interface CollectionResponse extends Collections {
  types: RecyclingType[];
}
