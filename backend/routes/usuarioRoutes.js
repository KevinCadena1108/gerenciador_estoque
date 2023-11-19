import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import { usuarioRepository } from "../repositories/index.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { ensureAdmin } from "../middlewares/ensureAdmin.js";

const userRoutes = Router();

const userController = new UsuarioController(usuarioRepository);

userRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  userController.createUser
);

export { userRoutes };
