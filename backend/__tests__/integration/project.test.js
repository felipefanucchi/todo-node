const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Project Integration", () => {
  beforeEach(async () => await truncate());

  it("should create a project when reach the /project endpoint", async () => {
    const user = await factory.create("User");

    const project = {
      name: faker.company.companyName(),
      UserId: user.id,
    };

    const response = await request(app)
      .post("/project")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(project);

    expect(response.status).toBe(200);
  });

  it("should not create a project when has no name", async () => {
    const user = await factory.create("User");

    const project = {};

    const response = await request(app)
      .post("/project")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(project);

    expect(response.status).toBe(500);
  });
});
