import { CreateCooperativePrisma } from "../@types/CooperativeTypes";
import { ICryptUtils } from "../utils/CryptUtils";

export class Cooperative implements CreateCooperativePrisma {
  readonly email: string;

  readonly name: string;

  readonly latitude: number;

  readonly longitude: number;

  readonly password: string;

  readonly address: string;

  #cryptUtils: ICryptUtils;

  constructor(
    {
      email,
      latitude,
      longitude,
      name,
      password,
      address,
    }: CreateCooperativePrisma,
    cryptUtils: ICryptUtils
  ) {
    this.email = email;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.address = address;
    this.#cryptUtils = cryptUtils;
    this.password = this.#cryptUtils.hashDataBcrypt(password);
  }
}
