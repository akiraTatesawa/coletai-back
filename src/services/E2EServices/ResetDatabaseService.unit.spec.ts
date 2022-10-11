import { IE2ERepository } from "../../repositories/IE2ERepository";
import { MockE2ERepository } from "../../repositories/prisma/mocks/MockE2ERepository";
import { ResetDatabaseServiceImpl } from "./ResetDatabaseService";

describe("Reset Database Service", () => {
  const repository: IE2ERepository = new MockE2ERepository();
  const service = new ResetDatabaseServiceImpl(repository);

  it("Should be able to reset the database", async () => {
    jest.spyOn(repository, "reset").mockResolvedValueOnce();

    await expect(service.execute()).resolves.not.toThrow();
    expect(repository.reset).toHaveBeenCalledTimes(1);
  });
});
