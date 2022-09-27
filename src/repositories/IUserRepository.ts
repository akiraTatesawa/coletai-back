import { User } from "@prisma/client";
import { CreateUserPrisma } from "../@types/UserTypes";

export interface IUserRepository {
  insert(userData: CreateUserPrisma): Promise<void>;
  getByEmail(email: string): Promise<User | null>;
}
