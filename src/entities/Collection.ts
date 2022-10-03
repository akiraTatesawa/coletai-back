import {
  CollectionInsertPrisma,
  RecyclingType,
} from "../@types/CollectionTypes";

export class Collection implements CollectionInsertPrisma {
  readonly cooperativeId: string;

  readonly userId: string;

  readonly types: RecyclingType[];

  constructor(cooperativeId: string, userId: string, types: RecyclingType[]) {
    this.cooperativeId = cooperativeId;
    this.userId = userId;
    this.types = [...types];
  }
}
