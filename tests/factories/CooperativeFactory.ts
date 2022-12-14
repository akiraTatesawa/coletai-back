import {
  randEmail,
  randPassword,
  randLatitude,
  randLongitude,
  randUuid,
  randCompanyName,
  randFullAddress,
} from "@ngneat/falso";
import { Cooperative as PrismaCooperative } from "@prisma/client";
import {
  LoginCooperative,
  CooperativeLocation,
  CooperativeLocationName,
  CreateCooperativeReq,
} from "../../src/@types/CooperativeTypes";
import { Cooperative } from "../../src/entities/Cooperative";
import { ICryptUtils, CryptUtils } from "../../src/utils/CryptUtils";
import { JWTUtils } from "../../src/utils/JWTUtils";
import { prisma } from "../../src/database/prisma";

export class CooperativeFactory {
  private cryptUtils: ICryptUtils = new CryptUtils();

  generateReqSignUpCooperativeData(): CreateCooperativeReq {
    const data: CreateCooperativeReq = {
      name: randCompanyName(),
      email: randEmail(),
      password: randPassword(),
      latitude: randLatitude(),
      longitude: randLongitude(),
    };

    return data;
  }

  generateReqSignUpInvalidCooperativeData(): Omit<
    CreateCooperativeReq,
    "latitude"
  > {
    const invalidData: Omit<CreateCooperativeReq, "latitude"> = {
      name: randCompanyName(),
      email: randEmail(),
      password: randPassword(),
      longitude: randLongitude(),
    };

    return invalidData;
  }

  generatePrismaCooperativeData(): {
    prismaCooperative: PrismaCooperative;
    reqCooperative: CreateCooperativeReq;
  } {
    const data: CreateCooperativeReq = this.generateReqSignUpCooperativeData();

    const address = randFullAddress();

    const prismaCooperative: PrismaCooperative = {
      ...new Cooperative({ ...data, address }, this.cryptUtils),
      id: randUuid(),
      created_at: new Date(),
    };

    return { prismaCooperative, reqCooperative: data };
  }

  generateCooperativeToken(id: string) {
    const token = new JWTUtils(process.env.JWT_SECRET).createToken({
      id,
    });

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async createPrismaCooperative(): Promise<{
    reqLogin: LoginCooperative;
    reqCooperative: CreateCooperativeReq;
    token: {
      Authorization: string;
    };
    prismaCooperative: PrismaCooperative;
  }> {
    const { reqCooperative } = this.generatePrismaCooperativeData();

    const reqLogin: LoginCooperative = {
      email: reqCooperative.email,
      password: reqCooperative.password,
    };

    const cooperative = new Cooperative(
      { ...reqCooperative, address: randFullAddress() },
      this.cryptUtils
    );

    const prismaCooperative = await prisma.cooperative.create({
      data: cooperative,
    });

    const token = this.generateCooperativeToken(prismaCooperative.id);

    return { reqLogin, reqCooperative, token, prismaCooperative };
  }

  generateLoginCooperativeData(): LoginCooperative {
    return {
      email: randEmail(),
      password: randPassword(),
    };
  }

  generatePrismaCooperativesLocation(): CooperativeLocation[] {
    const cooperativeLocation: CooperativeLocation = {
      id: randUuid(),
      latitude: randLatitude(),
      longitude: randLongitude(),
    };

    return [cooperativeLocation, cooperativeLocation, cooperativeLocation];
  }

  generatePrismaCooperativesNamesLocations(): CooperativeLocationName[] {
    const cooperative: CooperativeLocationName = {
      name: randCompanyName(),
      latitude: randLatitude(),
      longitude: randLongitude(),
    };

    return [cooperative, cooperative, cooperative];
  }
}
