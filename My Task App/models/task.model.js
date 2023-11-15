import mongoose from "mongoose";
import taskSchema from "../mongoSchemas/taskSchema.js";

class TaskModel {
  mongo_model;
  constructor() {
    this.mongo_model = mongoose.model("tasks ", taskSchema);
  }
  async getAllTasks() {
    const tasks = await this.mongo_model.find();
    return tasks;
  }
  async createTask(newTask) {
    const task = new this.mongo_model(newTask);
    const createdTask = await task.save();

    return {
      _id: createdTask._id.toString(), // Convert ObjectId to string
      taskName: createdTask.taskName,
      creator: createdTask.creator,
      description: createdTask.description,
    };
  }
  async deleteTask(id) {
    console.log("Deleting task with ID:", id);
    const objectId = mongoose.Types.ObjectId(id);
    const deletedTask = await this.mongo_model.findByIdAndDelete(objectId);
    console.log(deletedTask, "deleted Task");
  }
}

export default TaskModel;
