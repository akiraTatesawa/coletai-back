import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IResetDatabase } from "../../services/E2EServices/ResetDatabaseService";

export class ResetDatabaseController extends Controller<IResetDatabase> {
  async handle(req: Request, res: Response): Promise<void> {
    await this.service.execute();

    res.status(200).send();
  }
}
