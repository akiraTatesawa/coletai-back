import { IServiceExecute } from "../../@types/ServiceTypes";
import {
  CreateCooperativePrisma,
  CreateCooperativeReq,
} from "../../@types/CooperativeTypes";
import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";
import { CustomError } from "../../entities/CustomError";
import { Cooperative } from "../../entities/Cooperative";
import { ICryptUtils } from "../../utils/CryptUtils";
import { GetFullAddressService } from "../NominatimServices/GetFullAddressService";

type CooperativeEmail = Pick<CreateCooperativePrisma, "email">;
type CooperativeName = Pick<CreateCooperativePrisma, "name">;

export interface ICreateCooperativeService
  extends IServiceExecute<CreateCooperativeReq, void> {}

export class CreateCooperativeService implements ICreateCooperativeService {
  private repository: ICooperativeRepository;

  private cryptUtils: ICryptUtils;

  private getFullAddressService: GetFullAddressService;

  constructor(
    repository: ICooperativeRepository,
    cryptUtils: ICryptUtils,
    getFullAddressService: GetFullAddressService
  ) {
    this.repository = repository;
    this.cryptUtils = cryptUtils;
    this.getFullAddressService = getFullAddressService;
  }

  private async isEmailUnique({ email }: CooperativeEmail): Promise<boolean> {
    const cooperative = await this.repository.findByEmail(email);
    if (cooperative) {
      return false;
    }
    return true;
  }

  private async isNameUnique({ name }: CooperativeName): Promise<boolean> {
    const cooperative = await this.repository.findByName(name);
    if (cooperative) {
      return false;
    }
    return true;
  }

  async execute(cooperativeReqData: CreateCooperativeReq): Promise<void> {
    const isEmailUnique = await this.isEmailUnique({
      email: cooperativeReqData.email,
    });
    if (!isEmailUnique) {
      throw new CustomError(
        "error_conflict",
        `The email ${cooperativeReqData.email} is already being used`
      );
    }

    const isNameUnique = await this.isNameUnique({
      name: cooperativeReqData.name,
    });
    if (!isNameUnique) {
      throw new CustomError(
        "error_conflict",
        `The cooperative name '${cooperativeReqData.name}' is already being used`
      );
    }

    const address = await this.getFullAddressService.execute(
      cooperativeReqData
    );

    const createCooperativeData: CreateCooperativePrisma = {
      ...cooperativeReqData,
      address: address || "unregistered address",
    };

    const cooperative = new Cooperative(createCooperativeData, this.cryptUtils);

    await this.repository.insert(cooperative);
  }
}
