// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { randUuid } from "@ngneat/falso";
import { prisma } from "../../src/database/prisma";
import { CollectionFactory } from "../factories/CollectionFactory";
import { UserFactory } from "../factories/UserFactory";
import { app } from "../../src/app";
import { CollectionRequest } from "../../src/@types/CollectionTypes";
import { CooperativeFactory } from "../factories/CooperativeFactory";

describe("POST /collections", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE collections CASCADE`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("201: Should be able to create a collection", async () => {
    const { config } = await new UserFactory().createPrismaUser();
    const collectionReq = new CollectionFactory().generateValidCollectionReq();

    const result = await request(app)
      .post("/collections")
      .send(collectionReq)
      .set(config);

    expect(result.status).toEqual(201);
    expect(result.body).toEqual({});
  });

  it("422: Should not be able to create a collection with an invalid req body", async () => {
    const { config } = await new UserFactory().createPrismaUser();
    const collectionReq = new CollectionFactory().generateValidCollectionReq();
    const invalidReq = { ...collectionReq, invalidField: "" };

    const result = await request(app)
      .post("/collections")
      .send(invalidReq)
      .set(config);

    expect(result.status).toEqual(422);
    expect(result.body).toHaveProperty("name", "Unprocessable Entity");
  });

  it("404: Should not be able to create a collection when the user is not registered", async () => {
    const config = new UserFactory().generateUserConfig(randUuid());
    const collectionReq = new CollectionFactory().generateValidCollectionReq();

    const result = await request(app)
      .post("/collections")
      .send(collectionReq)
      .set(config);

    expect(result.status).toEqual(404);
    expect(result.body).toHaveProperty("message", "User not found");
  });

  it("404: Should not be able to create a collection with an invalid recycling type", async () => {
    const { config } = await new UserFactory().createPrismaUser();
    const collectionReq = new CollectionFactory().generateValidCollectionReq();
    const invalidReq: CollectionRequest = {
      ...collectionReq,
      types: [...collectionReq.types, { name: "Invalid" }],
    };

    const result = await request(app)
      .post("/collections")
      .send(invalidReq)
      .set(config);

    expect(result.status).toEqual(404);
    expect(result.body).toHaveProperty("name", "Not Found");
  });

  it("400: Should not be able to create a collection when token is not sent", async () => {
    const collectionReq = new CollectionFactory().generateValidCollectionReq();

    const result = await request(app).post("/collections").send(collectionReq);

    expect(result.status).toEqual(400);
    expect(result.body).toHaveProperty("message", "Token must be sent");
  });

  it("422: Should not be able to create a collection with an invalid token format", async () => {
    const { config } = await new UserFactory().createPrismaUser();
    const invalidConfig: typeof config = {
      ...config,
      Authorization: `invalid`,
    };
    const collectionReq = new CollectionFactory().generateValidCollectionReq();

    const result = await request(app)
      .post("/collections")
      .send(collectionReq)
      .set(invalidConfig);

    expect(result.status).toEqual(422);
    expect(result.body).toHaveProperty("message", "Invalid token format");
  });

  it("401: Should not be able to create a collection with an broken token", async () => {
    const { config } = await new UserFactory().createPrismaUser();
    const brokenConfig: typeof config = {
      ...config,
      Authorization: `Bearer broken`,
    };
    const collectionReq = new CollectionFactory().generateValidCollectionReq();

    const result = await request(app)
      .post("/collections")
      .send(collectionReq)
      .set(brokenConfig);

    expect(result.status).toEqual(401);
    expect(result.body).toHaveProperty("name", "Unauthorized");
  });
});

describe("PATCH /collections/:id/cancel", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE cooperatives CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE collections CASCADE`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("200: Should be able to cancel a collection", async () => {
    const { prismaUser } = await new UserFactory().createPrismaUser();
    const { prismaCooperative, token } =
      await new CooperativeFactory().createPrismaCooperative();
    const { id } = await new CollectionFactory().createCollection({
      userId: prismaUser.id,
      cooperativeId: prismaCooperative.id,
    });

    const result = await request(app)
      .patch(`/collections/${id}/cancel`)
      .set(token);

    expect(result.status).toEqual(200);
    expect(result.body).toEqual({});
  });

  it("403: Should not be able to cancel a collection if it does not belong to the cooperative", async () => {
    const { prismaUser } = await new UserFactory().createPrismaUser();
    const { token } = await new CooperativeFactory().createPrismaCooperative();
    const { prismaCooperative } =
      await new CooperativeFactory().createPrismaCooperative();
    const { id } = await new CollectionFactory().createCollection({
      userId: prismaUser.id,
      cooperativeId: prismaCooperative.id,
    });

    const result = await request(app)
      .patch(`/collections/${id}/cancel`)
      .set(token);

    expect(result.status).toEqual(403);
    expect(result.body).toHaveProperty(
      "message",
      "You don't have permission to cancel this collection"
    );
  });

  it("400: Should not be able to cancel a collection if its already cancelled", async () => {
    const { prismaUser } = await new UserFactory().createPrismaUser();
    const { prismaCooperative, token } =
      await new CooperativeFactory().createPrismaCooperative();
    const { id } = await new CollectionFactory().createCollection({
      userId: prismaUser.id,
      cooperativeId: prismaCooperative.id,
      status: "cancelled",
    });

    const result = await request(app)
      .patch(`/collections/${id}/cancel`)
      .set(token);

    expect(result.status).toEqual(400);
    expect(result.body).toHaveProperty(
      "message",
      "This collection is already cancelled"
    );
  });

  it("400: Should not be able to cancel a collection if its already finished", async () => {
    const { prismaUser } = await new UserFactory().createPrismaUser();
    const { prismaCooperative, token } =
      await new CooperativeFactory().createPrismaCooperative();
    const { id } = await new CollectionFactory().createCollection({
      userId: prismaUser.id,
      cooperativeId: prismaCooperative.id,
      status: "finished",
    });

    const result = await request(app)
      .patch(`/collections/${id}/cancel`)
      .set(token);

    expect(result.status).toEqual(400);
    expect(result.body).toHaveProperty(
      "message",
      "This collection is already finished"
    );
  });
});
