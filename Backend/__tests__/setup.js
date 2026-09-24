const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const Redis = require("ioredis-mock");

jest.mock("ioredis", () => require("ioredis-mock"));

jest.mock("express-rate-limit", () => () => (req, res, next) => next());

jest.mock("rate-limit-redis", () => ({
  RedisStore: class MockRedisStore {
    constructor() {}
    increment() {
      return { totalHits: 1, resetTime: new Date() };
    }
    decrement() {}
    resetKey() {}
  },
}));

process.env.JWT_KEY = process.env.JWT_KEY || "test_jwt_secret_key";
process.env.CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "test_google_client_id";
process.env.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "test_google_client_secret";

let mongoServer;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }

  const redisClient = new Redis();
  await redisClient.flushall();
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});
