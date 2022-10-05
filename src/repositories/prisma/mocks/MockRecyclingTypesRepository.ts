import { IRecyclingTypesRepository } from "../../IRecyclingTypesRepository";

export class MockRecyclingTypesRepository implements IRecyclingTypesRepository {
  getAll = jest.fn();
}
