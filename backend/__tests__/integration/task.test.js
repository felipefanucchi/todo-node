const request = require("supertest");
const faker = require("faker");

const app = require("../../src/app");
const factory = require("../factories");

describe("Task Integration", () => {
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

  it("should not create a task without projectId", async () => {
    const user = await factory.create("User");
    const task = {
      description: "criar listagem de usuário",
      completed: false,
      finishDate: "04-19-2021",
      projectId: null,
    };

    const response = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(task);

    expect(response.status).toBe(404);
  });

  it("should not create a task with invalid projectId", async () => {
    const user = await factory.create("User");

    const task = {
      description: "criar listagem de usuário",
      completed: false,
      finishDate: "04-19-2021",
      projectId: 999999,
    };

    const response = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(task);

    expect(response.status).toBe(404);
  });

  it("should update a task", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });
    const task = await factory.create("Task", {
      ProjectId: project.id,
    });

    const taskUpdate = {
      description: faker.commerce.productDescription(),
      completed: faker.datatype.boolean(),
      finishDate: faker.date.future(),
    };

    const response = await request(app)
      .put(`/task/${task.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(taskUpdate);

    expect(response.status).toBe(200);
  });

  it("should delete a task", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });
    const task = await factory.create("Task", {
      ProjectId: project.id,
      completed: false,
    });
    const taskUpdate = {
      description: faker.commerce.productDescription(),
      completed: faker.datatype.boolean(),
      finishDate: faker.date.future(),
    };

    const response = await request(app)
      .delete(`/task/${task.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(taskUpdate);

    expect(response.status).toBe(201);
  });

  it("should not delete a task completed", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });
    const task = await factory.create("Task", {
      ProjectId: project.id,
      completed: true,
    });

    const response = await request(app)
      .delete(`/task/${task.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(403);
  });

  it("should not delete a task with invalid id", async () => {
    const user = await factory.create("User");
    const response = await request(app)
      .delete(`/task/999999`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
  });

  it("should not delete a task without id", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .delete(`/task/`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
  });

  it("should not update a task completed", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });
    const task = await factory.create("Task", {
      ProjectId: project.id,
      completed: true,
    });
    const taskUpdate = {
      description: faker.commerce.productDescription(),
      completed: false,
      finishDate: faker.date.future(),
    };

    const response = await request(app)
      .put(`/task/${task.id}`)
      .set("Authorization", `Bearer ${user.generateToken()}`)
      .send(taskUpdate);

    expect(response.status).toBe(403);
  });

  it("should not update a task with invalid id", async () => {
    const user = await factory.create("User");
    const response = await request(app)
      .put(`/task/999999`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
  });

  it("should not update a task without id", async () => {
    const user = await factory.create("User");

    const response = await request(app)
      .put(`/task/`)
      .set("Authorization", `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
  });
});
