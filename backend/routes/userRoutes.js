import { Router } from "express";
import UserController from "../controllers/UserController.js";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userController.get);

export { userRoutes };
