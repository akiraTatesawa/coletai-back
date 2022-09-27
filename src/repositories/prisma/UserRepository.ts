import { User } from "@prisma/client";
import { CreateUserPrisma } from "../../@types/UserTypes";
import { prisma } from "../../database/prisma";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository {
  async insert(userData: CreateUserPrisma): Promise<void> {
    await prisma.user.create({
      data: userData,
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
