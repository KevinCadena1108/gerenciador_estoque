import { Router } from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { produtoRepository } from "../repositories/index.js";

const produtoRoutes = Router();

const produtoController = new ProdutoController(produtoRepository);

produtoRoutes.get("/", ensureAuthenticated, async (req, res) => {
  await produtoController.getProdutos(req, res);
});

export { produtoRoutes };