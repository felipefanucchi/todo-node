const factory = require("../factories");

describe("Project", () => {
  it("should create a project", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });

    expect(project).toHaveProperty("name");
  });
});
