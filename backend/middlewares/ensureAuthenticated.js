import AppError from "../AppError.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import jwt from "jsonwebtoken";

export async function ensureAuthenticated(req, res, next) {
  // Verificar existência do Token
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Sem token no cabeçalho da requisição");

  //Desestruturar Token
  const [, token] = authHeader.split(" ");

  //Validação do token
  try {
    const { sub: user_id } = jwt.verify(token, "6cfdab0d3659a2e6058293d7");

    const usersRepository = new UsuarioRepository();
    const user = await usersRepository.findById(parseInt(user_id));

    if (!user) throw new AppError("Usuário não existe");

    req.user = user;

    next();
  } catch (error) {
    throw new AppError("Token enviado é invalido");
  }
}
