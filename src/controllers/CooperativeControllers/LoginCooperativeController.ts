import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { LoginCooperativeService } from "../../services/CooperativeServices/LoginCooperativeService";
import { LoginCooperative } from "../../@types/CooperativeTypes";

export class LoginCooperativeController extends Controller<LoginCooperativeService> {
  async handle(req: Request, res: Response): Promise<void> {
    const cooperativeLoginData: LoginCooperative = req.body;

    const token = await this.service.execute(cooperativeLoginData);

    res.status(200).send(token);
  }
}
