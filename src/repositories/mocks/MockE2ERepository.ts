import { IE2ERepository } from "../IE2ERepository";

export class MockE2ERepository implements IE2ERepository {
  reset = jest.fn();
}
