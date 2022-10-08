import { IE2ERepository } from "../IE2ERepository";
import { prisma } from "../../database/prisma";

export class E2ERepository implements IE2ERepository {
  async reset(): Promise<void> {
    await prisma.$executeRawUnsafe("TRUNCATE TABLE users CASCADE");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE cooperatives CASCADE");
    await prisma.$executeRawUnsafe("TRUNCATE TABLE collections CASCADE");
  }
}
