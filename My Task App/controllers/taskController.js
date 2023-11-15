import TaskModel from "../models/task.model.js";
const taskModel = new TaskModel();
class TaskController {
  async getAllTasks(req, res) {
    try {
      const tasks = await taskModel.getAllTasks();

      res.render("homePage", { tasks });
    } catch (error) {
      console.log(error);
    }
  }

  async createT(req, res) {
    const { taskName, creator, description } = req.body;
    const taskData = {
      taskName: taskName,
      creator: creator,
      description: description,
    };

    const tasks = await taskModel.createTask(taskData);
    console.log(tasks, "tasks");
    res.status(201).json({ ...tasks });
    return tasks;
  }
  async deleteTask(req, res) {
    const taskId = req.params.id;
    console.log("Received request to delete task with ID:", taskId);
    await taskModel.deleteTask(taskId);
    res.send({ deletedTaskId: deletedTask._id });
  }
}

export default TaskController;
