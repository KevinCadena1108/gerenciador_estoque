import e, { Router } from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { produtoRepository } from "../repositories/index.js";

const produtoRoutes = Router();

const produtoController = new ProdutoController(produtoRepository);

produtoRoutes.get("/", ensureAuthenticated, async (req, res) => {
  await produtoController.getProdutos(req, res);
});

produtoRoutes.get("/select", ensureAuthenticated, async (req, res) => {
  await produtoController.getProdutosForSelect(req, res);
});

produtoRoutes.post("/", ensureAuthenticated, async (req, res) => {
  await produtoController.createProduto(req, res);
});

produtoRoutes.get("/recover/:id", ensureAuthenticated, async (req, res) => {
  await produtoController.findProdutoById(req, res);
});

produtoRoutes.put("/:id", ensureAuthenticated, async (req, res) => {
  await produtoController.updateProduto(req, res);
});

produtoRoutes.delete("/:id", ensureAuthenticated, async (req, res) => {
  await produtoController.deleteProduto(req, res);
});

export { produtoRoutes };
