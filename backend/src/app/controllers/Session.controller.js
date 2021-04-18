const { User } = require("../models");
class SessionController {
  async store(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return response.status(401).json({
        message: "Invalid password or username",
      });

    const isPasswordValid = await user.validPassword(password);

    if (!isPasswordValid)
      return response.status(401).json({
        message: "Invalid password or username",
      });

    return response.status(200).json({
      user,
      token: user.generateToken(),
    });
  }
}

module.exports = new SessionController();
