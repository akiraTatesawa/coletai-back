import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { ICreateUserService } from "../../services/UserServices/CreateUserService";
import { CreateUserPrisma } from "../../@types/UserTypes";

export class CreateUserController extends Controller<ICreateUserService> {
  async handle(req: Request, res: Response): Promise<void> {
    const createUserData: CreateUserPrisma = req.body;

    await this.service.execute(createUserData);

    res.status(201).send();
  }
}
