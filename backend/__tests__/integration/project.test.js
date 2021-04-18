const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Project Integration", () => {
  beforeEach(async () => await truncate());

  it("should create a project", async () => {
    const user = await factory.create("User");

    const project = {
      name: faker.company.companyName(),
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

  it("should update a project", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });

    const newProject = {
      name: faker.company.companyName(),
    };

    const response = await request(app)
      .put(`/project/${project.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(newProject);

    expect(response.status).toBe(200);
  });

  it("should not update a project when there is none", async () => {
    const user = await factory.create("User");

    const newProject = {
      name: faker.company.companyName(),
    };

    const response = await request(app)
      .put("/project/0")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(newProject);

    expect(response.status).toBe(404);
  });

  it("should delete a project", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });

    const response = await request(app)
      .delete(`/project/${project.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(201);
  });

  it("should not delete a project when there is none", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .put("/project/0")
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
  });
});
