import { randText, randUuid } from "@ngneat/falso";
import {
  CreateCollectionData,
  CollectionInsertPrisma,
} from "../../src/@types/CollectionTypes";
import { RecyclingTypesFactory } from "./RecyclingTypesFactory";
import { Collection } from "../../src/entities/Collection";

export class CollectionFactory {
  generateValidCollectionReq(): CreateCollectionData {
    const collectionReq: CreateCollectionData = {
      description: randText(),
      types: new RecyclingTypesFactory().generateValidType(),
      userId: randUuid(),
    };

    return collectionReq;
  }

  generateCollectionEntity(): {
    collectionReq: CreateCollectionData;
    collection: CollectionInsertPrisma;
  } {
    const collectionReq: CreateCollectionData =
      this.generateValidCollectionReq();

    const collection: CollectionInsertPrisma = new Collection(
      randUuid(),
      collectionReq.userId,
      collectionReq.types,
      collectionReq.description
    );

    return { collectionReq, collection };
  }
}
