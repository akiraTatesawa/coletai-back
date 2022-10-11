import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { CreateUserService } from "../../services/UserServices/CreateUserService";
import { CreateUserReq } from "../../@types/UserTypes";

export class CreateUserController extends Controller<CreateUserService> {
  async handle(req: Request, res: Response): Promise<void> {
    const createUserData: CreateUserReq = req.body;

    await this.service.execute(createUserData);

    res.status(201).send();
  }
}
