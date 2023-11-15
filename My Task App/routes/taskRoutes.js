import TaskController from "../controllers/taskController.js";
import { requireAuth, checkUser } from "../middleware/authMiddleware.js";
import { Router } from "express";
const taskController = new TaskController();

const taskRouter = Router();
// taskRouter.post("/", taskController.createTask);

taskRouter.get("*", checkUser);
taskRouter.get("/", requireAuth, taskController.getAllTasks);
taskRouter.post("/create-tasks", taskController.createT);
taskRouter.delete("/:id", taskController.deleteTask);
export default taskRouter;
