import { Cooperative } from "@prisma/client";

export type CreateCooperativePrisma = Omit<Cooperative, "id" | "created_at">;

export type CreateCooperativeReq = Omit<CreateCooperativePrisma, "address">;

export type LoginCooperative = Pick<Cooperative, "email" | "password">;

export type CooperativeLocation = Pick<
  Cooperative,
  "id" | "latitude" | "longitude"
>;

export type CooperativeLocationName = Pick<
  Cooperative,
  "name" | "latitude" | "longitude"
>;
