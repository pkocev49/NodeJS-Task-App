import { Router } from "express";
import authRouter from "../routes/authRoutes.js";
import taskRouter from "../routes/taskRoutes.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("mainPage");
  // res.send("Server is live.");
});

// //localhost:3000/tasks
router.use("/", authRouter);
router.use("/tasks", taskRouter);

export default router;
