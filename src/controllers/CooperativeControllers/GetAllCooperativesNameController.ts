import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IGetAllCooperativesName } from "../../services/CooperativeServices/GetAllCooperativesNameService";

export class GetAllCooperativesNameController extends Controller<IGetAllCooperativesName> {
  async handle(req: Request, res: Response): Promise<void> {
    const cooperatives = await this.service.execute();

    res.status(200).send(cooperatives);
  }
}
