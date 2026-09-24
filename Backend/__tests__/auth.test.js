const request = require("supertest");
const app = require("../app");
const User = require("../models/users");

describe("Auth Routes", () => {
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "Password123!",
    confirmPassword: "Password123!",
  };

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app).post("/api/auth/register").send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message");

      const user = await User.findOne({ email: testUser.email });
      expect(user).toBeTruthy();
      expect(user.name).toBe(testUser.name);
    });

    it("should reject registration on missing fields", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "missing@example.com" });

      expect(res.statusCode).toBe(400);
    });

    it("should reject duplicate email", async () => {
      await request(app).post("/api/auth/register").send(testUser);

      const res = await request(app).post("/api/auth/register").send(testUser);

      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/auth/register").send(testUser);

      await User.updateOne(
        { email: testUser.email },
        { $set: { isVerified: true } },
      );
    });

    it("should login successfully and return a token", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("accessToken");

      const cookies = res.headers["set-cookie"];
      const hasCookieToken =
        cookies &&
        cookies.some(
          (cookie) =>
            cookie.includes("token=") ||
            cookie.includes("refreshToken=") ||
            cookie.includes("accessToken="),
        );
      const hasBodyToken = res.body.token || res.body.accessToken;

      expect(hasCookieToken || hasBodyToken).toBeTruthy();
    });

    it("should reject login on incorrect password", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: "WrongPassword!" });

      expect(res.statusCode).toBe(400);
    });
  });
});
