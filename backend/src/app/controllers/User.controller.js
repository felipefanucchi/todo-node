const { User } = require("../models");
class UserController {
  async store(request, response) {
    const { firstName, lastName, email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (user)
      return response
        .status(404)
        .json({ messagen: "Email already registered" });

    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      return response.status(200).send(user);
    } catch (error) {
      return response.status(500).json({
        message: "Error while creating your account, please try again later",
      });
    }
  }

  async show(request, response) {
    const userId = request.userId;

    if (!userId)
      return response.status(404).json({ messagen: "User not found" });

    let user = await User.findOne({ where: { id: userId } });

    if (!user) return response.status(404).json({ messagen: "User not found" });

    try {
      return response.status(200).send(user);
    } catch (error) {
      return response.status(500).json({
        message:
          "Error while bringin your data account, please try again later",
      });
    }
  }
}

module.exports = new UserController();
