import { CreateCooperativePrisma } from "../@types/CooperativeTypes";
import { ICryptUtils } from "../utils/CryptUtils";

export class Cooperative implements CreateCooperativePrisma {
  readonly email: string;

  readonly name: string;

  readonly latitude: number;

  readonly longitude: number;

  readonly password: string;

  #cryptUtils: ICryptUtils;

  constructor(
    { email, latitude, longitude, name, password }: CreateCooperativePrisma,
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
