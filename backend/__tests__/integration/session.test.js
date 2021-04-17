const { User } = require("../../src/app/models");

describe("Authentication", () => {
  it("should sum x and y", async () => {
    const user = await User.create({
      firstName: "Felipe",
      lastName: "Fanucchi",
      password: "123456",
      email: "flfanucchi@gmail.com",
    });
    expect(user.email).toBe("flfanucchi@gmail.com");
  });
});
