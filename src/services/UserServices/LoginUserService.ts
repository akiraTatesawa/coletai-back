import { IServiceExecute } from "../../@types/ServiceTypes";
import { Token } from "../../@types/TokenTypes";
import { LoginUser } from "../../@types/UserTypes";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICryptUtils } from "../../utils/CryptUtils";
import { JWTUtilsInterface } from "../../utils/JWTUtils";
import { CustomError } from "../../entities/CustomError";

export interface ILoginUserService extends IServiceExecute<LoginUser, Token> {}

export class LoginUserService implements ILoginUserService {
  private repository: IUserRepository;

  private cryptUtils: ICryptUtils;

  private jwtUtils: JWTUtilsInterface;

  constructor(
    repository: IUserRepository,
    cryptUtils: ICryptUtils,
    jwtUtils: JWTUtilsInterface
  ) {
    this.repository = repository;
    this.cryptUtils = cryptUtils;
    this.jwtUtils = jwtUtils;
  }

  private isPasswordCorrect(
    reqPassword: string,
    userPassword: string
  ): boolean {
    return this.cryptUtils.validateEncryptedData(reqPassword, userPassword);
  }

  async execute(userLoginData: LoginUser): Promise<Token> {
    const user = await this.repository.getByEmail(userLoginData.email);
    if (!user) {
      throw new CustomError("error_not_found", "User not found");
    }

    const isCorrect = this.isPasswordCorrect(
      userLoginData.password,
      user.password
    );
    if (!isCorrect) {
      throw new CustomError("error_unauthorized", "Wrong password");
    }

    const token = this.jwtUtils.createToken({ id: user.id });

    return { token };
  }
}
