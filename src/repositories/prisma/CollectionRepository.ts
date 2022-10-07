import { Collection } from "@prisma/client";
import {
  CollectionInsertPrisma,
  CollectionList,
} from "../../@types/CollectionTypes";
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

  async listById(id: string): Promise<Collection | null> {
    return prisma.collection.findUnique({
      where: {
        id,
      },
    });
  }

  async listAllByAccountId(
    params: "cooperativeId" | "userId",
    id: string
  ): Promise<CollectionList[]> {
    return prisma.collection.findMany({
      where: {
        [params]: id,
      },
      orderBy: {
        updated_at: "desc",
      },
      select: {
        id: true,
        description: true,
        status: true,
        created_at: true,
        updated_at: true,
        cooperative: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        types: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async cancelCollection(id: string): Promise<void> {
    await prisma.collection.update({
      where: {
        id,
      },
      data: {
        status: "cancelled",
      },
    });
  }

  async finishCollection(id: string): Promise<void> {
    await prisma.collection.update({
      where: {
        id,
      },
      data: {
        status: "finished",
      },
    });
  }
}
