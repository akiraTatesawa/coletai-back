import { CreateUserPrisma } from "../@types/UserTypes";
import { ICryptUtils } from "../utils/CryptUtils";

export class User implements CreateUserPrisma {
  readonly email: string;

  readonly name: string;

  readonly latitude: number;

  readonly longitude: number;

  readonly password: string;

  #cryptUtils: ICryptUtils;

  constructor(
    { email, latitude, longitude, name, password }: CreateUserPrisma,
    cryptUtils: ICryptUtils
  ) {
    this.email = email;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.#cryptUtils = cryptUtils;
    this.password = this.#cryptUtils.hashDataBcrypt(password);
  }
}
