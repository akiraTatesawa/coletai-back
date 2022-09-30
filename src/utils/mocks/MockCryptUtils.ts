import { ICryptUtils } from "../CryptUtils";

export class MockCryptUtils implements ICryptUtils {
  hashDataBcrypt = jest.fn();

  validateEncryptedData = jest.fn();
}
