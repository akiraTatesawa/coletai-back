import { CollectionInsertPrisma } from "../../@types/CollectionTypes";
import { prisma } from "../../database/prisma";
import { ICollectionRepository } from "../ICollectionRepository";

export class CollectionRepository implements ICollectionRepository {
  async insert(data: CollectionInsertPrisma): Promise<void> {
    await prisma.collection.create({
      data: {
        ...data,
        types: {
          connect: [...data.types],
        },
      },
    });
  }
}
