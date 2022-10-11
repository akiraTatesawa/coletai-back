import { IServiceExecute } from "../../@types/ServiceTypes";
import { CreateUserPrisma, CreateUserReq } from "../../@types/UserTypes";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CustomError } from "../../entities/CustomError";
import { ICryptUtils } from "../../utils/CryptUtils";
import { User } from "../../entities/User";
import { GetFullAddressService } from "../NominatimServices/GetFullAddressService";

type UserEmail = Pick<CreateUserReq, "email">;

export interface CreateUserService
  extends IServiceExecute<CreateUserReq, void> {}

export class CreateUserServiceImpl implements CreateUserService {
  private repository: IUserRepository;

  private cryptUtils: ICryptUtils;

  private getFullAddressService: GetFullAddressService;

  constructor(
    repository: IUserRepository,
    cryptUtils: ICryptUtils,
    getFullAddressService: GetFullAddressService
  ) {
    this.repository = repository;
    this.cryptUtils = cryptUtils;
    this.getFullAddressService = getFullAddressService;
  }

  private async isUnique({ email }: UserEmail): Promise<boolean> {
    const user = await this.repository.getByEmail(email);

    if (!user) {
      return true;
    }

    return false;
  }

  async execute(userReqData: CreateUserReq): Promise<void> {
    const isEmailUnique = await this.isUnique({ email: userReqData.email });

    if (!isEmailUnique) {
      throw new CustomError(
        "error_conflict",
        `The email ${userReqData.email} is already being used`
      );
    }

    const address = await this.getFullAddressService.execute(userReqData);

    if (!address) {
      throw new CustomError(
        "error_bad_request",
        "Invalid latitude and longitude"
      );
    }

    const createUserData: CreateUserPrisma = { ...userReqData, address };

    const user = new User(createUserData, this.cryptUtils);

    await this.repository.insert(user);
  }
}
