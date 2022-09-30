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

  it("422: Should not be able to create an user with invalid req body format", async () => {
    const invalidReqUser = userFactory.generateReqSignUpInvalidUserData();

    const result = await request(app).post("/users").send(invalidReqUser);

    expect(result.status).toEqual(422);
    expect(result.body).toHaveProperty("name", "Unprocessable Entity");
  });

  it("409: Should not be able to create an user that already exists", async () => {
    const { reqUser } = await userFactory.createPrismaUser();

    const result = await request(app).post("/users").send(reqUser);

    expect(result.status).toEqual(409);
    expect(result.body).toHaveProperty("name", "Conflict");
  });
});

describe("POST /users/sign-in", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  const userFactory = new UserFactory();

  it("200: Should be able login", async () => {
    const { loginUser } = await userFactory.createPrismaUser();

    const result = await request(app).post("/users/sign-in").send(loginUser);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty("token");
  });

  it("422: Should not be able to login with an invalid req body format", async () => {
    const { loginUser } = await userFactory.createPrismaUser();

    const result = await request(app)
      .post("/users/sign-in")
      .send({ ...loginUser, invalidField: "" });

    expect(result.status).toEqual(422);
    expect(result.body).toHaveProperty("name", "Unprocessable Entity");
  });

  it("404: Should not be able login if the user is not registered", async () => {
    const reqUser = userFactory.generateReqLoginUserData();

    const result = await request(app).post("/users/sign-in").send(reqUser);

    expect(result.status).toEqual(404);
    expect(result.body).toHaveProperty("name", "Not Found");
  });

  it("401: Should not be able to login with an incorrect password", async () => {
    const { loginUser } = await userFactory.createPrismaUser();

    const result = await request(app)
      .post("/users/sign-in")
      .send({ ...loginUser, password: "incorrect" });

    expect(result.status).toEqual(401);
    expect(result.body).toHaveProperty("name", "Unauthorized");
  });
});
