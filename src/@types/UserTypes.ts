import { User } from "@prisma/client";

export type CreateUserPrisma = Omit<User, "id" | "created_at">;

export type CreateUserReq = Omit<CreateUserPrisma, "address">;

export type LoginUser = Pick<User, "email" | "password">;
