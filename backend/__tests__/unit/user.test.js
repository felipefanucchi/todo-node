const bcrypt = require("bcryptjs");

const factory = require("../factories");

describe("User", () => {
  it("should encrypt user password", async () => {
    const user = await factory.create("User", {
      password: "123456",
    });
    const compare = await bcrypt.compare("123456", user.password);

    expect(compare).toBe(true);
  });

  it("should create a user", async () => {
    const user = await factory.create("User");

    expect(user).toHaveProperty("id");
  });
});
