const { Task, Project } = require("../models");
class TaskController {
  async store(request, response) {
    const { description, finishDate, projectId: ProjectId } = request.body;

    console.log(ProjectId);

    if (!ProjectId)
      return response.status(404).send({ message: "Project not found" });

    const project = await Project.findOne({ where: { id: ProjectId } });

    if (!project)
      return response.status(404).send({ message: "Project not found" });

    try {
      const task = await Task.create({
        ProjectId,
        description,
        finishDate,
      });
      return response.status(200).send(task);
    } catch (error) {
      return response.status(500).send({
        message:
          "There was an error while creating your task, please try again later",
      });
    }
  }
}

module.exports = new TaskController();
