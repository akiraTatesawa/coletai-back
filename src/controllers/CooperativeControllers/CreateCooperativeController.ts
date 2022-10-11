import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { CreateCooperativeService } from "../../services/CooperativeServices/CreateCooperativeService";
import { CreateCooperativeReq } from "../../@types/CooperativeTypes";

export class CreateCooperativeController extends Controller<CreateCooperativeService> {
  async handle(req: Request, res: Response): Promise<void> {
    const createCooperativeData: CreateCooperativeReq = req.body;

    await this.service.execute(createCooperativeData);

    res.status(201).send();
  }
}
