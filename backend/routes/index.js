import { Router } from "express";
import { userRoutes } from "./usuarioRoutes.js";
import { clienteRoutes } from "./clienteRoutes.js"
import { pedidoRoutes } from "./pedidosRoutes.js";
import { authenticationRoutes } from "./authenticationRoutes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/cliente", clienteRoutes);
router.use("/pedidos", pedidoRoutes);
router.use("/auth", authenticationRoutes);

export { router };
