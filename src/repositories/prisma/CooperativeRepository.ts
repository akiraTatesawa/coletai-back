import { Cooperative } from "@prisma/client";
import {
  CooperativeLocation,
  CreateCooperativePrisma,
} from "../../@types/CooperativeTypes";
import { prisma } from "../../database/prisma";
import { ICooperativeRepository } from "../ICooperativeRepository";

export class CooperativeRepository implements ICooperativeRepository {
  async insert(data: CreateCooperativePrisma): Promise<void> {
    await prisma.cooperative.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<Cooperative | null> {
    return prisma.cooperative.findUnique({
      where: {
        email,
      },
    });
  }

  async findByName(name: string): Promise<Cooperative | null> {
    return prisma.cooperative.findUnique({
      where: {
        name,
      },
    });
  }

  async getAllCooperativesLocation(): Promise<CooperativeLocation[]> {
    const cooperatives: CooperativeLocation[] =
      await prisma.cooperative.findMany({
        select: {
          id: true,
          latitude: true,
          longitude: true,
        },
      });

    return cooperatives;
  }
}
