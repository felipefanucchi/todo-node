const { Task } = require("../models");
class TaskController {
  async store(request, response) {
    const { description, finishDate, projectId: ProjectId } = request.body;

    if (!ProjectId) {
      return response.status(404).send({ message: "Project not found" });
    }
    const project = await Project.findOne({ where: { id: ProjectId } });

    if (!project) {
      return response.status(404).send({ message: "Project not found" });
    }

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

  async update(request, response) {
    const { description, finishDate, completed } = request.body;
    const { id } = request.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
      return response.status(404).send({ message: "Project not found" });
    }

    if (task.completed)
      return response.status(403).send({ message: "Task already finished" });

    try {
      if (description) {
        task.description = description;
      }

      if (finishDate) {
        task.finishDate = finishDate;
      }

      if (completed) {
        task.completed = completed;
      }

      await task.save();

      return response.status(200).send(task);
    } catch (error) {
      return response.status(500).send({
        message:
          "There was an error while creating your task, please try again later",
      });
    }
  }

  async delete(request, response) {
    const { description, finishDate, completed } = request.body;
    const { id } = request.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
      return response.status(404).send({ message: "Project not found" });
    }

    if (task.completed)
      return response.status(403).send({ message: "Task cannot be deleted" });

    try {
      await task.destroy();

      return response.status(201).send(task);
    } catch (error) {
      return response.status(500).send({
        message:
          "There was an error while creating your task, please try again later",
      });
    }
  }
}

module.exports = new TaskController();
