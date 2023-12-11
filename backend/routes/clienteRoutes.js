import { Router } from "express";
import ClienteController from "../controllers/ClienteController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { clienteRepository } from "../repositories/index.js";

const clienteRoutes = Router();

const clienteController = new ClienteController(clienteRepository);

clienteRoutes.get("/", ensureAuthenticated, async (req, res) => {
  await clienteController.getClients(req, res);
});

clienteRoutes.get("/:id", ensureAuthenticated, async (req, res) => {
  await clienteController.recoverClient(req, res);
});

clienteRoutes.get("/autocomplete", ensureAuthenticated, async (req, res) => {
  await clienteController.getClientsAutocomplete(req, res);
});

clienteRoutes.post("/", ensureAuthenticated, async (req, res) => {
  await clienteController.createClient(req, res);
});

clienteRoutes.put("/:id", ensureAuthenticated, async (req, res) => {
  await clienteController.updateClient(req, res);
});

clienteRoutes.delete("/:id", ensureAuthenticated, async (req, res) => {
  await clienteController.deleteClient(req, res);
});

export { clienteRoutes };
