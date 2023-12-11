import { Router } from "express";
import PedidoController from "../controllers/PedidoController.js";
import { pedidoRepository } from "../repositories/index.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const pedidoRoutes = Router();

const pedidoController = new PedidoController(pedidoRepository);

pedidoRoutes.get("/", ensureAuthenticated, async (req, res) => {
  await pedidoController.getPedidos(req, res);
});

pedidoRoutes.get("/chart", ensureAuthenticated, async (req, res) => {
  await pedidoController.getPedidosForChart(req, res);
});

pedidoRoutes.get("/total", ensureAuthenticated, async (req, res) => {
  await pedidoController.getTotalPedidos(req, res);
});

pedidoRoutes.post("/", ensureAuthenticated, async (req, res) => {
  await pedidoController.createPedido(req, res);
});

pedidoRoutes.delete("/:id", ensureAuthenticated, async (req, res) => {
  await pedidoController.deletePedido(req, res);
});

export { pedidoRoutes };
