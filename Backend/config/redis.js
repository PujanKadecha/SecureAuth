const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_URL = process.env.REDIS_URL || `redis://${REDIS_HOST}:${REDIS_PORT}`;

const redisClient = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 5,
  retryStrategy: (times) => Math.min(times * 200, 2000),
});

redisClient.on("connect", () => {
  console.log("Redis Connected Successfully");
});

redisClient.on("error", (err) => {
  console.error("Redis Connection Error:", err.message);
});

module.exports = redisClient;
