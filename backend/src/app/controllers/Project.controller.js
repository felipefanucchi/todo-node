const { Project } = require("../models");
class ProjectController {
  async store(request, response) {
    const UserId = request.userId;
    const { name } = request.body;

    try {
      const project = await Project.create({ UserId, name });
      return response.status(200).send(project);
    } catch (error) {
      return response.status(500).send({
        message:
          "There was an error while bringing creating your project, please try again later",
      });
    }
  }
}

module.exports = new ProjectController();
