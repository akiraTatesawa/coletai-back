import {
  randEmail,
  randPassword,
  randLatitude,
  randLongitude,
  randUuid,
  randCompanyName,
} from "@ngneat/falso";
import { PrismaClient, Cooperative as PrismaCooperative } from "@prisma/client";
import { CreateCooperativePrisma } from "../../src/@types/CooperativeTypes";
import { Cooperative } from "../../src/entities/Cooperative";
import { ICryptUtils, CryptUtils } from "../../src/utils/CryptUtils";

export class CooperativeFactory {
  private cryptUtils: ICryptUtils = new CryptUtils();

  private prisma: PrismaClient = new PrismaClient();

  generateReqSignUpCooperativeData(): CreateCooperativePrisma {
    const data: CreateCooperativePrisma = {
      name: randCompanyName(),
      email: randEmail(),
      password: randPassword(),
      latitude: randLatitude(),
      longitude: randLongitude(),
    };

    return data;
  }

  generateReqSignUpInvalidCooperativeData(): Omit<
    CreateCooperativePrisma,
    "latitude"
  > {
    const invalidData: Omit<CreateCooperativePrisma, "latitude"> = {
      name: randCompanyName(),
      email: randEmail(),
      password: randPassword(),
      longitude: randLongitude(),
    };

    return invalidData;
  }

  generatePrismaCooperativeData(): {
    prismaCooperative: PrismaCooperative;
    reqCooperative: CreateCooperativePrisma;
  } {
    const data: CreateCooperativePrisma =
      this.generateReqSignUpCooperativeData();

    const prismaCooperative: PrismaCooperative = {
      ...new Cooperative(data, this.cryptUtils),
      id: randUuid(),
      created_at: new Date(),
    };

    return { prismaCooperative, reqCooperative: data };
  }

  async createPrismaCooperative(): Promise<CreateCooperativePrisma> {
    const reqCooperative = this.generateReqSignUpCooperativeData();

    const cooperative = new Cooperative(reqCooperative, this.cryptUtils);

    await this.prisma.cooperative.create({
      data: cooperative,
    });

    return reqCooperative;
  }
}
