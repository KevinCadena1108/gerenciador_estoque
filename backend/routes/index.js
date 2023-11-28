import { Router } from "express";
import { userRoutes } from "./usuarioRoutes.js";
import { clienteRoutes } from "./clienteRoutes.js";
import { pedidoRoutes } from "./pedidosRoutes.js";
import { produtoRoutes } from "./produtoRoutes.js";
import { authenticationRoutes } from "./authenticationRoutes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/cliente", clienteRoutes);
router.use("/produto", produtoRoutes);
router.use("/pedidos", pedidoRoutes);
router.use("/auth", authenticationRoutes);

export { router };
