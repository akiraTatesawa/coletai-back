import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { CreateCollectionService } from "../../services/CollectionServices/CreateCollectionService";
import { CollectionRequest } from "../../@types/CollectionTypes";

export class CreateCollectionController extends Controller<CreateCollectionService> {
  async handle(req: Request, res: Response): Promise<void> {
    const userId: string = res.locals.id;
    const collectionReqData: CollectionRequest = req.body;

    await this.service.execute({
      ...collectionReqData,
      userId,
    });

    res.status(201).send();
  }
}
