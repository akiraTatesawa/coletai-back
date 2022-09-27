import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { ICreateCooperativeService } from "../../services/CooperativeServices/CreateCooperativeService";
import { CreateCooperativeData } from "../../@types/CooperativeTypes";

export class CreateCooperativeController extends Controller<ICreateCooperativeService> {
  async handle(req: Request, res: Response): Promise<void> {
    const createCooperativeData: CreateCooperativeData = req.body;

    await this.service.execute(createCooperativeData);

    res.status(201).send();
  }
}
