import AppError from "../AppError.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";

export async function ensureAdmin(req, res, next) {
  const { idu } = req.user;

  const usersRepository = new UsuarioRepository();
  const user = await usersRepository.findById(idu);

  if (user.tipo !== "ADMINISTRADOR")
    throw new AppError("Usuário não é administrador");

  return next();
}
