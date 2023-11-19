import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController.js";
import { usuarioRepository } from "../repositories/index.js";

const authenticationRoutes = Router();

const authenticationController = new AuthenticationController(
  usuarioRepository
);

authenticationRoutes.get("/signin", authenticationController.signIn);

export { authenticationRoutes };
