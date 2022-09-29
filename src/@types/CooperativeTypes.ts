import { Cooperative } from "@prisma/client";

export type CreateCooperativePrisma = Omit<Cooperative, "id" | "created_at">;
