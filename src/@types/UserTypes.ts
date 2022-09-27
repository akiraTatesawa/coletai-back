import { User } from "@prisma/client";

export type CreateUserPrisma = Omit<User, "id" | "created_at">;

export type CreateUserData = CreateUserPrisma & {
  confirmPassword: string;
};
