import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { ICreateCollectionService } from "../../services/CollectionServices/CreateCollectionService";
import { CollectionRequest } from "../../@types/CollectionTypes";

export class CreateCollectionController extends Controller<ICreateCollectionService> {
  async handle(req: Request, res: Response): Promise<void> {
    const collectionReqData: CollectionRequest = req.body;

    const createdCollection = await this.service.execute(collectionReqData);

    res.status(201).send(createdCollection);
  }
}
