const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Dashboard Integration", () => {
  beforeEach(async () => await truncate());

  it("should bring all projects related to logged user", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .send(user)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
});
