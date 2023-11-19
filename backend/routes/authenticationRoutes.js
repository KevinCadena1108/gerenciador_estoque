import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController.js";
import { usuarioRepository } from "../repositories/index.js";

const authenticationRoutes = Router();

const authenticationController = new AuthenticationController(
  usuarioRepository
);

authenticationRoutes.post("/signin", async (req, res) => {
  await authenticationController.signIn(req, res);
});

export { authenticationRoutes };
