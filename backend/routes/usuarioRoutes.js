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

userRoutes.get("/recover/:id", ensureAuthenticated, async (req, res) => {
  await userController.findById(req, res);
});

userRoutes.get("/autocomplete", ensureAuthenticated, async (req, res) => {
  await userController.getUsersAutocomplete(req, res);
});

userRoutes.get("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  await userController.getUsers(req, res);
});

userRoutes.post("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  await userController.createUser(req, res);
});

userRoutes.put("/:id", ensureAuthenticated, async (req, res) => {
  await userController.updateUser(req, res);
});

userRoutes.delete(
  "/:id",
  ensureAuthenticated,
  ensureAdmin,
  async (req, res) => {
    await userController.deleteUser(req, res);
  }
);

export { userRoutes };
