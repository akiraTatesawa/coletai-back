import { ICryptUtils } from "../utils/CryptUtils";
import { JWTUtilsInterface } from "../utils/JWTUtils";

export interface IServiceExecute<T, O> {
  execute(data: T): Promise<O>;
}

export abstract class LoginService<R> {
  protected repository: R;

  protected cryptUtils: ICryptUtils;

  protected jwtUtils: JWTUtilsInterface;

  constructor(
    repository: R,
    cryptUtils: ICryptUtils,
    jwtUtils: JWTUtilsInterface
  ) {
    this.repository = repository;
    this.cryptUtils = cryptUtils;
    this.jwtUtils = jwtUtils;
  }

  protected isPasswordCorrect(
    reqPassword: string,
    userPassword: string
  ): boolean {
    return this.cryptUtils.validateEncryptedData(reqPassword, userPassword);
  }
}
