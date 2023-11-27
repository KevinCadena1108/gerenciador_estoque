import AppError from "../AppError.js";

class ClienteController {
  constructor(clienteRepository) {
    this.repository = clienteRepository;
  }

  async recoverUser(req, res) {
    const user = req.user;

    if (!user) throw new AppError("Cliente não encontrado");

    return res.status(200).json(user);
  }

  async createUser(req, res) {
    const { nome, endereco, email, telefone, tipo } = req.body;

    const userAlreadyExists = await this.repository.findByEmail(email);
    if (userAlreadyExists.length > 0)
      throw new AppError("Já existe um cliente com esse email");

    await this.repository.createUser({
      nome,
      endereco,
      email,
      telefone,
      tipo,
    });

    return res.status(200).json({ message: "Cliente criado com sucesso" });
  }

  async getUsers(req, res) {
    const page = parseInt(req.query?.page);

    const users = await this.repository.getUsers(page);

    return res.status(200).json(users);
  }
}

export default ClienteController;
