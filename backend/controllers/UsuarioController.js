import { hash } from "bcrypt";

class UsuarioController {
  repository;

  contructor(usuarioRepository) {
    this.repository = usuarioRepository;
  }

  async createUser(req, res) {
    const { nome, email, senha, telefone, cargo, tipo } = req.body;

    const userAlreadyExists = await this.repository.findByEmail(email);
    if (userAlreadyExists)
      return res
        .status(400)
        .json({ message: "Já existe um usuário com esse email" });

    const passwordHash = await hash(senha, 8);

    await this.repository.createUser({
      nome,
      email,
      passwordHash,
      telefone,
      cargo,
      tipo,
    });

    return res.status(500).json({ message: "Usuário criado com sucesso" });
  }
}

export default UsuarioController;
