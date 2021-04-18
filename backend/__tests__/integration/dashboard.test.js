const request = require("supertest");

const app = require("../../src/app");
const factory = require("../factories");

describe("Dashboard Integration", () => {
  it("should bring all projects related to logged user", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .get("/dashboard")
      .send(user)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response).not.toBe(500);
  });
});
