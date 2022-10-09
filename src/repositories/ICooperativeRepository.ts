import { Cooperative } from "@prisma/client";
import {
  CooperativeLocationName,
  CreateCooperativePrisma,
  CooperativeLocation,
} from "../@types/CooperativeTypes";

export interface ICooperativeRepository {
  insert(data: CreateCooperativePrisma): Promise<void>;
  findByName(name: string): Promise<Cooperative | null>;
  findByEmail(email: string): Promise<Cooperative | null>;
  getAllCooperativesLocation(): Promise<CooperativeLocation[]>;
  getAllCooperatives(): Promise<CooperativeLocationName[]>;
}
