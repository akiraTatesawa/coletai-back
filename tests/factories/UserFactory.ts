import {
  randUserName,
  randEmail,
  randPassword,
  randLatitude,
  randLongitude,
  randUuid,
} from "@ngneat/falso";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { CreateUserPrisma } from "../../src/@types/UserTypes";
import { User } from "../../src/entities/User";
import { ICryptUtils, CryptUtils } from "../../src/utils/CryptUtils";

export class UserFactory {
  private cryptUtils: ICryptUtils = new CryptUtils();

  private prisma: PrismaClient = new PrismaClient();

  generateReqSignUpUserData(): CreateUserPrisma {
    const data: CreateUserPrisma = {
      name: randUserName(),
      email: randEmail(),
      password: randPassword(),
      latitude: randLatitude(),
      longitude: randLongitude(),
    };

    return data;
  }

  generateReqSignUpInvalidUserData(): Omit<CreateUserPrisma, "latitude"> {
    const invalidData: Omit<CreateUserPrisma, "latitude"> = {
      name: randUserName(),
      email: randEmail(),
      password: randPassword(),
      longitude: randLongitude(),
    };

    return invalidData;
  }

  generatePrismaUserData(): {
    prismaUser: PrismaUser;
    reqUser: CreateUserPrisma;
  } {
    const data: CreateUserPrisma = this.generateReqSignUpUserData();

    const prismaUser: PrismaUser = {
      ...new User(data, this.cryptUtils),
      id: randUuid(),
      created_at: new Date(),
    };

    return { prismaUser, reqUser: data };
  }

  async createPrismaUser(): Promise<CreateUserPrisma> {
    const reqUser = this.generateReqSignUpUserData();

    const user = new User(reqUser, this.cryptUtils);

    await this.prisma.user.create({
      data: user,
    });

    return reqUser;
  }
}
