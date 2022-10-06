/* eslint-disable max-len */
import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IListCollectionsByIUserIdService } from "../../services/CollectionServices/ListCollectionsByUserIdService";

export class ListCollectionsByUserIdController extends Controller<IListCollectionsByIUserIdService> {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = res.locals as { id: string };

    const collections = await this.service.execute(id);

    res.status(200).send(collections);
  }
}
