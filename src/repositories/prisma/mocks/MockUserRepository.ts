import { IUserRepository } from "../../IUserRepository";

export class MockUserRepository implements IUserRepository {
  getByEmail = jest.fn();

  insert = jest.fn();

  getById = jest.fn();
}
