import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { LoginUserService } from "../../services/UserServices/LoginUserService";
import { LoginUser } from "../../@types/UserTypes";

export class LoginUserController extends Controller<LoginUserService> {
  async handle(req: Request, res: Response): Promise<void> {
    const reqLoginUserData: LoginUser = req.body;

    const token = await this.service.execute(reqLoginUserData);

    res.status(200).send(token);
  }
}
