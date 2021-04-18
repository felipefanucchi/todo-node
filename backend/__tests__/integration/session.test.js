const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Session Integration", () => {
  beforeEach(async () => await truncate());

  it("should auth with valid credentials", async () => {
    const user = await factory.create("User", {
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.status).toBe(200);
  });

  it("should not auth with invalid password", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "invalid_pass",
    });

    expect(response.status).toBe(401);
  });

  it("should not auth with invalid email", async () => {
    await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: "test@test.com",
      password: "123456",
    });

    expect(response.status).toBe(401);
  });

  it("should return a JWT when authorized", async () => {
    const user = await factory.create("User", {
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123456",
    });

    expect(response.body).toHaveProperty("token");
  });

  it('should be able to access "authed" routes with JWT', async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", "Bearer " + user.generateToken());

    expect(response.status).toBe(200);
  });

  it('should not be able to access "authed" routes without JWT', async () => {
    await factory.create("User");

    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(401);
  });

  it('should not be able to access "authed" with invalid JWT', async () => {
    await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", "Bearer 123456231");

    expect(response.status).toBe(401);
  });
});
