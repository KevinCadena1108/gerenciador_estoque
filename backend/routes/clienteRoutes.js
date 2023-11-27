import { Router } from "express";
import ClienteController from "../controllers/ClienteController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { clienteRepository } from "../repositories/index.js";

const clienteRoutes = Router();

const clienteController = new ClienteController(clienteRepository);

clienteRoutes.get("/", ensureAuthenticated, async (req, res) => {
  await clienteController.getClients(req, res);
});

export { clienteRoutes };
