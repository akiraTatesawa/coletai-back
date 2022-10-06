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

  async listByAccountId(
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
      },
    });
  }
}
