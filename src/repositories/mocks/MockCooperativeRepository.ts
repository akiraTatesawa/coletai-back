import { ICooperativeRepository } from "../ICooperativeRepository";

export class MockCooperativeRepository implements ICooperativeRepository {
  findByEmail = jest.fn();

  findByName = jest.fn();

  insert = jest.fn();

  getAllCooperativesLocation = jest.fn();

  getAllCooperatives = jest.fn();
}
