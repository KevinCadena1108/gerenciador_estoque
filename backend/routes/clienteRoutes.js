import { Router } from "express";
import ClienteController from "../controllers/ClienteController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { ensureAdmin } from "../middlewares/ensureAdmin.js";
import { clienteRepository } from "../repositories/index.js";

const userRoutes = Router();

const userController = new ClienteController(clienteRepository);

userRoutes.get("/recover", ensureAuthenticated, async (req, res) => {
  await userController.recoverUser(req, res);
});

userRoutes.get("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  await userController.getUsers(req, res);
});

userRoutes.post("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  await userController.createUser(req, res);
});

export { userRoutes };
