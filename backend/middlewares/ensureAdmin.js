import UsuarioRepository from "../repositories/UsuarioRepository.js";

export async function ensureAdmin(req, res, next) {
  const { id } = req.user;

  const usersRepository = new UsuarioRepository();
  const user = await usersRepository.findById(id);

  if (user.tipo !== "ADMINISTRADOR")
    return res.status(400).json({ message: "Usuário não é administrador" });

  return next();
}
