import { Router } from "express";
import PedidosController from "../controllers/PedidosController.js";

const pedidoRoutes = Router();

const pedidosController = new PedidosController();

pedidoRoutes.get("/", pedidosController.get);

export { pedidoRoutes };
