import { User } from "@prisma/client";

export type CreateUserPrisma = Omit<User, "id" | "created_at">;
