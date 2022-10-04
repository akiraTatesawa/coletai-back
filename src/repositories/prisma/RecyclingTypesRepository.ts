import { RecyclingTypes } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { IRecyclingTypesRepository } from "../IRecyclingTypesRepository";

export class RecyclingTypesRepository implements IRecyclingTypesRepository {
  async getAll(): Promise<RecyclingTypes[]> {
    return prisma.recyclingTypes.findMany();
  }
}
