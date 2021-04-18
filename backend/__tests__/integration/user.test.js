const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => await truncate());

  it("should create a user when form submits", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await request(app).post("/user").send(user);

    expect(response.status).toBe(200);
  });
});
