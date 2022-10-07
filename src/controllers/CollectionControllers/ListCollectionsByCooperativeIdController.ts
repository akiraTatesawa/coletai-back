/* eslint-disable max-len */
import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IListCollectionsByIdService } from "../../services/CollectionServices/ListCollectionsByIdService";

export class ListCollectionsByCooperativeIdController extends Controller<IListCollectionsByIdService> {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = res.locals as { id: string };

    const collections = await this.service.execute({
      params: "cooperativeId",
      id,
    });

    res.status(200).send(collections);
  }
}
