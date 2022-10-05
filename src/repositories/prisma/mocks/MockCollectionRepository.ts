import { ICollectionRepository } from "../../ICollectionRepository";

export class MockCollectionRepository implements ICollectionRepository {
  insert = jest.fn();
}
