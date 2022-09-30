import { JWTUtilsInterface } from "../JWTUtils";

export class MockJWTUtils implements JWTUtilsInterface {
  createToken = jest.fn();

  verifyToken = jest.fn();
}
