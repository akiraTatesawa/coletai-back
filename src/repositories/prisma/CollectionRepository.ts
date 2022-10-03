import { CollectionRequest } from "../../@types/CollectionTypes";
import { prisma } from "../../database/prisma";
import { ICollectionRepository } from "../ICollectionRepository";

export class CollectionRepository implements ICollectionRepository {
  async insert(data: CollectionRequest): Promise<void> {
    await prisma.collections.create({
      data: {
        ...data,
        types: {
          connect: [...data.types],
        },
      },
    });
  }
}
