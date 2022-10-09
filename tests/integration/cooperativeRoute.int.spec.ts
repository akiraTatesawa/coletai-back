// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { prisma } from "../../src/database/prisma";
import { CooperativeFactory } from "../factories/CooperativeFactory";
import { app } from "../../src/app";

describe("POST /cooperatives", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE cooperatives CASCADE`;
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
    const { reqCooperative } =
      await cooperativeFactory.createPrismaCooperative();

    const result = await request(app)
      .post("/cooperatives")
      .send(reqCooperative);

    expect(result.status).toEqual(409);
    expect(result.body).toHaveProperty("name", "Conflict");
  });
});

describe("POST /cooperatives/sign-in", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE cooperatives CASCADE`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  const cooperativeFactory = new CooperativeFactory();

  it("200: Should be able to login", async () => {
    const { reqLogin } = await cooperativeFactory.createPrismaCooperative();

    const result = await request(app)
      .post("/cooperatives/sign-in")
      .send(reqLogin);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("token");
  });

  it("422: Should not be able to login with an invalid req body", async () => {
    const reqLogin = cooperativeFactory.generateLoginCooperativeData();

    const result = await request(app)
      .post("/cooperatives/sign-in")
      .send({ ...reqLogin, invalidField: "" });

    expect(result.status).toEqual(422);
    expect(result.body).toHaveProperty("name", "Unprocessable Entity");
  });

  it("404: Should not be able to login if cooperative is not registered", async () => {
    const reqLogin = cooperativeFactory.generateLoginCooperativeData();

    const result = await request(app)
      .post("/cooperatives/sign-in")
      .send(reqLogin);

    expect(result.status).toEqual(404);
    expect(result.body).toHaveProperty("name", "Not Found");
  });

  it("401: Should not be able to login if the password is wrong", async () => {
    const { reqLogin } = await cooperativeFactory.createPrismaCooperative();

    const result = await request(app)
      .post("/cooperatives/sign-in")
      .send({ ...reqLogin, password: "incorrect" });

    expect(result.status).toEqual(401);
    expect(result.body).toHaveProperty("name", "Unauthorized");
  });
});

describe("GET /cooperatives/name-location", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE cooperatives CASCADE`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("200: Should be able to get all cooperatives names and locations", async () => {
    const factory = new CooperativeFactory();
    const cooperativesPromise = [
      factory.createPrismaCooperative(),
      factory.createPrismaCooperative(),
    ];

    await Promise.all(cooperativesPromise);

    const result = await request(app).get("/cooperatives/name-location");

    expect(result.status).toEqual(200);
    expect(result.body).toHaveLength(2);
    expect(result.body[0]).toHaveProperty("name");
  });
});
