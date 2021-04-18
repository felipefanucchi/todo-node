const factory = require("../factories");
const truncate = require("../utils/truncate");

describe("Project", () => {
  beforeEach(async () => await truncate());

  it("should create a project", async () => {
    const user = await factory.create("User");
    const project = await factory.create("Project", {
      UserId: user.id,
    });

    expect(project).toHaveProperty("name");
  });
});
