import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { ensureAdmin } from "../middlewares/ensureAdmin.js";
import { usuarioRepository } from "../repositories/index.js";

const userRoutes = Router();

const userController = new UsuarioController(usuarioRepository);

userRoutes.get("/recover", ensureAuthenticated, async (req, res) => {
  await userController.recoverUser(req, res);
});

userRoutes.post("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  await userController.createUser(req, res);
});

export { userRoutes };
