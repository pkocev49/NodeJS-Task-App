import AuthController from "../controllers/authController.js";
import { Router } from "express";
const authController = new AuthController();

const authRouter = Router();

authRouter.get("/login", authController.getLoginView);
authRouter.post("/login", authController.login_post);
authRouter.get("/signup", authController.getRegisteView);
authRouter.post("/signup", authController.signup_post);

export default authRouter;
