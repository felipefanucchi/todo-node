const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("User Integration", () => {
  beforeEach(async () => await truncate());

  it("should create a user when endpoint /user is called", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await request(app).post("/user").send(user);

    expect(response.status).toBe(200);
  });

  it("should not create a user with same email", async () => {
    await factory.create("User", {
      email: "test@test.com",
    });

    const userData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
      email: "test@test.com",
    };

    const response = await request(app).post("/user").send(userData);

    expect(response.status).toBe(404);
  });
});
