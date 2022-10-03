import { RecyclingTypes } from "@prisma/client";

export interface IRecyclingTypesRepository {
  getAll(): Promise<RecyclingTypes[]>;
}
