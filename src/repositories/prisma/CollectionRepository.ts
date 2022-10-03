import { Collections } from "@prisma/client";
import { CollectionInsertPrisma } from "../../@types/CollectionTypes";
import { prisma } from "../../database/prisma";
import { ICollectionRepository } from "../ICollectionRepository";

export class CollectionRepository implements ICollectionRepository {
  async insert(data: CollectionInsertPrisma): Promise<Collections> {
    return prisma.collections.create({
      data: {
        ...data,
        types: {
          connect: [...data.types],
        },
      },
    });
  }
}
