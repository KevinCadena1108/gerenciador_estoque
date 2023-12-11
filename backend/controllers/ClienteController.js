import AppError from "../AppError.js";

class ClienteController {
  constructor(clienteRepository) {
    this.repository = clienteRepository;
  }

  async deleteClient(req, res) {
    const { id } = req.params;

    await this.repository.deleteClient(parseInt(id));

    return res.status(200).json({ message: "Cliente deletado com sucesso" });
  }

  async updateClient(req, res) {
    const { nome, endereco, email, telefone, tipo, cpf, cnpj } = req.body;
    const { id } = req.params;

    const client = await this.repository.findById(parseInt(id));

    if (!id || !client) throw new AppError("Cliente não encontrado");

    if (tipo !== "PESSOA FISICA" && tipo !== "PESSOA JURIDICA")
      throw new AppError("Tipo de cliente inválido");

    await this.repository.updateClient(parseInt(id), {
      nome,
      endereco,
      email,
      telefone,
      tipo,
      cpf,
      cnpj,
    });

    return res.status(200).json({ message: "Cliente atualizado com sucesso" });
  }

  async recoverClient(req, res) {
    const { id } = req.params;

    const client = await this.repository.findById(id);

    if (!id || !client) throw new AppError("Cliente não encontrado");

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

    if (tipo !== "PESSOA FISICA" && tipo !== "PESSOA JURIDICA")
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
