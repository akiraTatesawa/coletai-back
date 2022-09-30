// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { prisma } from "../../src/database/prisma";
import { UserFactory } from "../factories/UserFactory";
import { app } from "../../src/app";

describe("POST /users", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  const userFactory = new UserFactory();

  it("201: Should be able to create an user", async () => {
    const reqUser = userFactory.generateReqSignUpUserData();

    const result = await request(app).post("/users").send(reqUser);

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({});
  });
});
