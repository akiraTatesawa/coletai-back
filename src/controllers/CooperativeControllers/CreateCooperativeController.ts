import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { ICreateCooperativeService } from "../../services/CooperativeServices/CreateCooperativeService";
import { CreateCooperativePrisma } from "../../@types/CooperativeTypes";

export class CreateCooperativeController extends Controller<ICreateCooperativeService> {
  async handle(req: Request, res: Response): Promise<void> {
    const createCooperativeData: CreateCooperativePrisma = req.body;

    await this.service.execute(createCooperativeData);

    res.status(201).send();
  }
}
