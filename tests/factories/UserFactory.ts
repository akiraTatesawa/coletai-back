import {
  randUserName,
  randEmail,
  randPassword,
  randLatitude,
  randLongitude,
} from "@ngneat/falso";
import { CreateUserPrisma } from "../../src/@types/UserTypes";
import { User } from "../../src/entities/User";
import { ICryptUtils, CryptUtils } from "../../src/utils/CryptUtils";

export class UserFactory {
  private cryptUtils: ICryptUtils = new CryptUtils();

  generateSignUpUserData(): User {
    const data: CreateUserPrisma = {
      name: randUserName(),
      email: randEmail(),
      password: randPassword(),
      latitude: randLatitude(),
      longitude: randLongitude(),
    };

    return new User(data, this.cryptUtils);
  }
}
