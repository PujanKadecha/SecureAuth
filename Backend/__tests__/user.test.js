const request = require("supertest");
const app = require("../app");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

describe("User Routes", () => {
  let token;
  let userId;

  beforeEach(async () => {
    const testUser = await User.create({
      name: "Profile User",
      email: "profile@example.com",
      password: "Password123!",
      isVerified: true,
    });

    userId = testUser._id.toString();

    const secret = process.env.JWT_KEY || "test_secret_key";
    token = jwt.sign({ id: userId, email: testUser.email }, secret, {
      expiresIn: "1h",
    });
  });

  describe(`GET /api/users/:id (Profile simulation)`, () => {
    it("should return 401 Unauthorized without a token", async () => {
      const res = await request(app).get(`/api/users/${userId}`);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("error", "No Token Provided");
    });

    it("should return 200 OK with the user payload when passed a valid Bearer token", async () => {
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("email", "profile@example.com");
      expect(res.body).toHaveProperty("name", "Profile User");
    });
  });
});
