import AppError from "../AppError.js";

class ClienteController {
  constructor(clienteRepository) {
    this.repository = clienteRepository;
  }

  async recoverClient(req, res) {
    const client = req.client;

    if (!client) throw new AppError("Cliente não encontrado");

    return res.status(200).json(client);
  }

  async getClientsAutocomplete(req, res) {
    const clients = await this.repository.getClientsAutocomplete();

    return res.status(200).json(clients);
  }

  async createClient(req, res) {
    const { nome, endereco, email, telefone, tipo, cpf, cnpj } = req.body;

    const clientExists = await this.repository.findByEmail(email);
    if (clientExists.length > 0) throw new AppError("Cliente já cadastrado");

    if (tipo !== "FISICO" && tipo !== "JURIDICO")
      throw new AppError("Tipo de cliente inválido");

    await this.repository.createClient({
      nome,
      endereco,
      email,
      telefone,
      tipo,
      cpf,
      cnpj,
    });

    return res.status(200).json({ message: "Cliente criado com sucesso" });
  }

  async getClients(req, res) {
    const page = parseInt(req.query?.page);

    const clients = await this.repository.getClients(page);

    return res.status(200).json(clients);
  }
}

export default ClienteController;
