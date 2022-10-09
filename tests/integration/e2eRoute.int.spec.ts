// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { app } from "../../src/app";

describe("DELETE /reset-database", () => {
  it("200: Should be able to delete all database", async () => {
    const result = await request(app).del("/reset-database");

    expect(result.status).toEqual(200);
    expect(result.body).toEqual({});
  });
});
