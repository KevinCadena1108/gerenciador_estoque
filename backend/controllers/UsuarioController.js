import { hash } from "bcrypt";
import AppError from "../AppError.js";

class UsuarioController {
  constructor(usuarioRepository) {
    this.repository = usuarioRepository;
  }

  async recoverUser(req, res) {
    const user = req.user;

    if (!user) throw new AppError("Usuário não encontrado");

    return res.status(200).json(user);
  }

  async findById(req, res) {
    const { id } = req.params;

    const user = await this.repository.findById(parseInt(id));

    return res.status(200).json(user);
  }

  async getUsersAutocomplete(req, res) {
    const users = await this.repository.getUsersAutocomplete();

    const withIdUsers = users.map((user) => ({
      ...user,
      label: `${user.id} - ${user.label}`,
    }));

    return res.status(200).json(withIdUsers);
  }

  async createUser(req, res) {
    const { nome, email, senha, telefone, cargo, tipo } = req.body;

    const userAlreadyExists = await this.repository.findByEmail(email);
    if (userAlreadyExists.length > 0)
      throw new AppError("Já existe um usuário com esse email");

    if (senha.length < 6)
      throw new AppError("Senha deve ter no mínimo 6 caracteres");

    if (tipo !== "ADMINISTRADOR" && tipo !== "FUNCIONARIO")
      throw new AppError("Tipo de usuário inválido");

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

  async getUsers(req, res) {
    const page = parseInt(req.query?.page);

    const users = await this.repository.getUsers(page);

    return res.status(200).json(users);
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    await this.repository.deleteUser(id);

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { nome, email, telefone, cargo, tipo } = req.body;

    if (tipo !== "ADMINISTRADOR" && tipo !== "FUNCIONARIO")
      throw new AppError("Tipo de usuário inválido");

    await this.repository.updateUser(parseInt(id), {
      nome,
      email,
      telefone,
      cargo,
      tipo,
    });

    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  }
}

export default UsuarioController;
