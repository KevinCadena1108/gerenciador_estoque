import { hash } from "bcrypt";
import AppError from "../AppError.js";

class UsuarioController {
  constructor(usuarioRepository) {
    this.repository = usuarioRepository;
  }

  async createUser(req, res) {
    const { nome, email, senha, telefone, cargo, tipo } = req.body;

    const userAlreadyExists = await this.repository.findByEmail(email);
    if (userAlreadyExists.length > 0)
      throw new AppError("Já existe um usuário com esse email");

    const passwordHash = await hash(senha, 8);

    await this.repository.createUser({
      nome,
      email,
      senha: passwordHash,
      telefone,
      cargo,
      tipo,
    });

    return res.status(200).json({ message: "Usuário criado com sucesso" });
  }
}

export default UsuarioController;
