const { User, Task } = require("../models");
class DashboardController {
  async index(request, response) {
    const UserId = request.userId;
    const user = await User.findOne({ where: { id: UserId } });

    try {
      const projects = await user.getProjects({ include: Task });
      return response.status(200).send(projects);
    } catch (error) {
      return response.status(500).send({
        message:
          "There was an error while bringing your projects, please try again later",
      });
    }
  }
}

module.exports = new DashboardController();
