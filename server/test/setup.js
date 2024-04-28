import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

describe("MongoDB Test Suite", () => {
  test("Example test case", () => {
    // Write your test case here
    // For example:
    expect(1 + 2).toBe(3);
  });
});
