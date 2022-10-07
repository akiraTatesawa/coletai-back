import { randText, randUuid, randPastDate } from "@ngneat/falso";
import { Collection as PrismaCollection } from "@prisma/client";
import {
  CreateCollectionData,
  CollectionInsertPrisma,
  CollectionRequest,
} from "../../src/@types/CollectionTypes";
import { RecyclingTypesFactory } from "./RecyclingTypesFactory";
import { Collection } from "../../src/entities/Collection";

export class CollectionFactory {
  generateValidCollectionData(): CreateCollectionData {
    const collectionData: CreateCollectionData = {
      description: randText(),
      types: new RecyclingTypesFactory().generateValidType(),
      userId: randUuid(),
    };

    return collectionData;
  }

  generateValidCollectionReq(): CollectionRequest {
    const collectionReq: CollectionRequest = {
      description: randText(),
      types: new RecyclingTypesFactory().generateValidType(),
    };

    return collectionReq;
  }

  generateCollectionEntity(): {
    collectionReq: CreateCollectionData;
    collection: CollectionInsertPrisma;
  } {
    const collectionReq: CreateCollectionData =
      this.generateValidCollectionData();

    const collection: CollectionInsertPrisma = new Collection(
      randUuid(),
      collectionReq.userId,
      collectionReq.types,
      collectionReq.description
    );

    return { collectionReq, collection };
  }

  generateCollectionFromPrisma({
    ...props
  }: Partial<PrismaCollection>): PrismaCollection {
    const prismaCollection: PrismaCollection = {
      id: randUuid(),
      cooperativeId: randUuid(),
      userId: randUuid(),
      description: randText(),
      status: "ongoing",
      created_at: randPastDate(),
      updated_at: randPastDate(),
      ...props,
    };

    return prismaCollection;
  }
}
