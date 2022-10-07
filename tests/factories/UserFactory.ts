import {
  randUserName,
  randEmail,
  randPassword,
  randLatitude,
  randLongitude,
  randUuid,
} from "@ngneat/falso";
import { User as PrismaUser } from "@prisma/client";
import { CreateUserPrisma, LoginUser } from "../../src/@types/UserTypes";
import { User } from "../../src/entities/User";
import { ICryptUtils, CryptUtils } from "../../src/utils/CryptUtils";
import { JWTUtils } from "../../src/utils/JWTUtils";
import { prisma } from "../../src/database/prisma";

interface Header {
  Authorization: string;
}

export class UserFactory {
  private cryptUtils: ICryptUtils = new CryptUtils();

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

  generateUserConfig(userId: string): Header {
    const token = new JWTUtils(process.env.JWT_SECRET).createToken({
      id: userId,
    });

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async createPrismaUser(): Promise<{
    reqUser: CreateUserPrisma;
    loginUser: LoginUser;
    config: Header;
    prismaUser: PrismaUser;
  }> {
    const reqUser = this.generateReqSignUpUserData();
    const loginUser: LoginUser = {
      email: reqUser.email,
      password: reqUser.password,
    };

    const user = new User(reqUser, this.cryptUtils);

    const prismaUser = await prisma.user.create({
      data: user,
    });

    const config = this.generateUserConfig(prismaUser.id);

    return { reqUser, loginUser, config, prismaUser };
  }

  generateReqLoginUserData(): LoginUser {
    return {
      email: randEmail(),
      password: randPassword(),
    };
  }
}
