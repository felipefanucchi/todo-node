const request = require("supertest");
const { User } = require("../../src/app/models");
const app = require("../../src/app");
const truncate = require("../utils/truncate");

describe("Authentication", () => {
  beforeEach(async () => await truncate());

  it("should auth with valid credentials", async () => {
    const user = await User.create({
      firstName: "felipe",
      lastName: "fanucchi",
      email: "test@test2.com",
      password: "123456",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
  });
});
