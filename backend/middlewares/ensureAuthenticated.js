import UsuarioRepository from "../repositories/UsuarioRepository.js";
import jwt from "jsonwebtoken";

export async function ensureAuthenticated(req, res, next) {
  // Verificar existência do Token
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(400)
      .json({ message: "Sem token no cabeçalho da requisição" });

  //Desestruturar Token
  const [, token] = authHeader.split(" ");

  //Validação do token
  try {
    const { sub: user_id } = jwt.verify(token, "6cfdab0d3659a2e6058293d7");

    const usersRepository = new UsuarioRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) return res.status(400).json({ message: "Usuário não existe" });

    req.user = user;

    next();
  } catch {
    return res.status(400).json({ message: "Token enviado é invalido" });
  }
}
