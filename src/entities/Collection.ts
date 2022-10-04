import {
  CollectionInsertPrisma,
  RecyclingType,
} from "../@types/CollectionTypes";

export class Collection implements CollectionInsertPrisma {
  readonly cooperativeId: string;

  readonly userId: string;

  readonly types: RecyclingType[];

  readonly description: string;

  constructor(
    cooperativeId: string,
    userId: string,
    types: RecyclingType[],
    description: string
  ) {
    this.cooperativeId = cooperativeId;
    this.userId = userId;
    this.types = [...types];
    this.description = description;
  }
}
