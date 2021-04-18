const { Project, Task } = require("../models");
class ProjectController {
  async store(request, response) {
    const UserId = request.userId;
    const { name } = request.body;

    try {
      const project = await Project.create({ UserId, name });

      const projectWithTasks = await project.reload({ include: Task });

      return response.status(200).send(projectWithTasks);
    } catch (error) {
      console.log(error);
      return response.status(500).send({
        message:
          "There was an error while creating your project, please try again later",
      });
    }
  }

  async update(request, response) {
    const { name } = request.body;
    const { id } = request.params;

    const project = await Project.findOne({ where: { id } });

    if (!project)
      return response.status(404).send({ message: "Project not found" });

    try {
      project.name = name;
      await project.save();
      return response.status(200).send(project);
    } catch (error) {
      return response.status(500).send({
        message:
          "There was an error while update your project, please try again later",
      });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    const project = await Project.findOne({ where: { id } });

    if (!project)
      return response.status(404).send({ message: "Project not found" });

    try {
      await project.destroy();
      return response.status(201).send();
    } catch (error) {
      console.log(error);
      return response.status(500).send({
        message:
          "There was an error while deleting your project, please try again later",
      });
    }
  }
}

module.exports = new ProjectController();
