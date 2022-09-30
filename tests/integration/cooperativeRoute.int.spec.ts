// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { prisma } from "../../src/database/prisma";
import { CooperativeFactory } from "../factories/CooperativeFactory";
import { app } from "../../src/app";

describe("POST /cooperatives", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE cooperatives`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  const cooperativeFactory = new CooperativeFactory();

  it("201: Should be able to create a cooperative", async () => {
    const reqCooperative =
      cooperativeFactory.generateReqSignUpCooperativeData();

    const result = await request(app)
      .post("/cooperatives")
      .send(reqCooperative);

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({});
  });

  it("422: Should not be able to create a cooperative with an invalid req body format", async () => {
    const invalidReqCooperative =
      cooperativeFactory.generateReqSignUpInvalidCooperativeData();

    const result = await request(app)
      .post("/cooperatives")
      .send(invalidReqCooperative);

    expect(result.status).toEqual(422);
    expect(result.body).toHaveProperty("name", "Unprocessable Entity");
  });

  it("409: Should not be able to create a cooperative that already exists", async () => {
    const reqCooperative = await cooperativeFactory.createPrismaCooperative();

    const result = await request(app)
      .post("/cooperatives")
      .send(reqCooperative);

    expect(result.status).toEqual(409);
    expect(result.body).toHaveProperty("name", "Conflict");
  });
});
