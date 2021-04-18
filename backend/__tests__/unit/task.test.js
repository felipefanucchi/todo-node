const factory = require("../factories");
const truncate = require("../utils/truncate");

describe("Task", () => {
  beforeEach(async () => await truncate());

  it("should create a task", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });
    const task = await factory.create("Task", {
      ProjectId: project.id,
    });

    expect(task).toHaveProperty("description");
  });
});
