import { Request, Response } from "express";
import { Controller } from "../../@types/ControllerTypes";
import { IFinishCollection } from "../../services/CollectionServices/FinishCollectionService";

export class FinishCollectionController extends Controller<IFinishCollection> {
  async handle(req: Request, res: Response): Promise<void> {
    const { id: cooperativeId } = res.locals as { id: string };
    const { id: collectionId } = req.params as { id: string };

    await this.service.execute({ collectionId, cooperativeId });

    res.status(200).send();
  }
}
