import {
  randUserName,
  randEmail,
  randPassword,
  randLatitude,
  randLongitude,
  randUuid,
  randFullAddress,
} from "@ngneat/falso";
import { User as PrismaUser } from "@prisma/client";
import { LoginUser, CreateUserReq } from "../../src/@types/UserTypes";
import { User } from "../../src/entities/User";
import { ICryptUtils, CryptUtils } from "../../src/utils/CryptUtils";
import { JWTUtils } from "../../src/utils/JWTUtils";
import { prisma } from "../../src/database/prisma";

interface Header {
  Authorization: string;
}

export class UserFactory {
  private cryptUtils: ICryptUtils = new CryptUtils();

  generateReqSignUpUserData(): CreateUserReq {
    const data: CreateUserReq = {
      name: randUserName(),
      email: randEmail(),
      password: randPassword(),
      latitude: randLatitude(),
      longitude: randLongitude(),
    };

    return data;
  }

  generateReqSignUpInvalidUserData(): Omit<CreateUserReq, "latitude"> {
    const invalidData: Omit<CreateUserReq, "latitude"> = {
      name: randUserName(),
      email: randEmail(),
      password: randPassword(),
      longitude: randLongitude(),
    };

    return invalidData;
  }

  generatePrismaUserData(): {
    prismaUser: PrismaUser;
    reqUser: CreateUserReq;
  } {
    const data: CreateUserReq = this.generateReqSignUpUserData();

    const address = randFullAddress();

    const prismaUser: PrismaUser = {
      ...new User({ ...data, address }, this.cryptUtils),
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
    reqUser: CreateUserReq;
    loginUser: LoginUser;
    config: Header;
    prismaUser: PrismaUser;
  }> {
    const reqUser = this.generateReqSignUpUserData();

    const loginUser: LoginUser = {
      email: reqUser.email,
      password: reqUser.password,
    };

    const address = randFullAddress();

    const user = new User({ ...reqUser, address }, this.cryptUtils);

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
