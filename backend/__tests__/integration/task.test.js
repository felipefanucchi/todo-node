const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories");

describe("Task Integration", () => {
  beforeEach(async () => await truncate());

  it("should create a task", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });

    const task = {
      description: faker.commerce.productDescription(),
      completed: faker.datatype.boolean(),
      finishDate: faker.date.future(),
      projectId: project.id,
    };

    const response = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(task);

    expect(response.status).toBe(200);
  });

  // it("should not create a task without projectId", async () => {
  //   const user = await factory.create("User");

  //   const task = {
  //     description: faker.commerce.productDescription(),
  //     completed: faker.datatype.boolean(),
  //     finishDate: faker.date.future(),
  //   };

  //   const response = await request(app)
  //     .post("/task")
  //     .set("Authorization", `Bearer ${user.generateToken()}`)
  //     .send(task);

  //   expect(response.status).toBe(404);
  // });

  // it("should not create a task with invalid projectId", async () => {
  //   const user = await factory.create("User");

  //   const task = {
  //     description: faker.commerce.productDescription(),
  //     completed: faker.datatype.boolean(),
  //     finishDate: faker.date.future(),
  //     projectId: 999999,
  //   };

  //   const response = await request(app)
  //     .post("/task")
  //     .set("Authorization", `Bearer ${user.generateToken()}`)
  //     .send(task);

  //   expect(response.status).toBe(404);
  // });
});
