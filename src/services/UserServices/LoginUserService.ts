import { IServiceExecute, LoginService } from "../../@types/ServiceTypes";
import { Token } from "../../@types/TokenTypes";
import { LoginUser } from "../../@types/UserTypes";
import { IUserRepository } from "../../repositories/IUserRepository";
import { CustomError } from "../../entities/CustomError";

export interface LoginUserService extends IServiceExecute<LoginUser, Token> {}

export class LoginUserServiceImpl
  extends LoginService<IUserRepository>
  implements LoginUserService
{
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
