import { ICollectionRepository } from "../../ICollectionRepository";

export class MockCollectionRepository implements ICollectionRepository {
  insert = jest.fn();

  listAllByAccountId = jest.fn();

  cancelCollection = jest.fn();

  listById = jest.fn();
}
