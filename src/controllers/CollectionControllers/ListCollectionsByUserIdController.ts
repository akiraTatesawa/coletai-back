/* eslint-disable max-len */
import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { ListCollectionsByIdService } from "../../services/CollectionServices/ListCollectionsByIdService";

export class ListCollectionsByUserIdController extends Controller<ListCollectionsByIdService> {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = res.locals as { id: string };

    const collections = await this.service.execute({ params: "userId", id });

    res.status(200).send(collections);
  }
}
