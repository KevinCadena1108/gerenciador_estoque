import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { pedidoRoutes } from "./pedidosRoutes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/pedidos", pedidoRoutes);

export { router };
