import { IServiceExecute, LoginService } from "../../@types/ServiceTypes";
import { LoginCooperative } from "../../@types/CooperativeTypes";
import { Token } from "../../@types/TokenTypes";
import { ICooperativeRepository } from "../../repositories/ICooperativeRepository";
import { CustomError } from "../../entities/CustomError";

export interface ILoginCooperativeService
  extends IServiceExecute<LoginCooperative, Token> {}

export class LoginCooperativeService
  extends LoginService<ICooperativeRepository>
  implements ILoginCooperativeService
{
  async execute(cooperativeLoginData: LoginCooperative): Promise<Token> {
    const cooperative = await this.repository.findByEmail(
      cooperativeLoginData.email
    );
    if (!cooperative) {
      throw new CustomError("error_not_found", "Cooperative not found");
    }

    const isCorrect = this.isPasswordCorrect(
      cooperativeLoginData.password,
      cooperative.password
    );
    if (!isCorrect) {
      throw new CustomError("error_unauthorized", "Wrong password");
    }

    const token = this.jwtUtils.createToken({ id: cooperative.id });

    return { token };
  }
}
