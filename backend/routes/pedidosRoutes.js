import { Router } from "express";
import PedidoController from "../controllers/PedidoController.js";
import { pedidoRepository } from "../repositories/index.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const pedidoRoutes = Router();

const pedidoController = new PedidoController(pedidoRepository);

pedidoRoutes.get("/", ensureAuthenticated, async (req, res) => {
  await pedidoController.getPedidos(req, res);
});

export { pedidoRoutes };
