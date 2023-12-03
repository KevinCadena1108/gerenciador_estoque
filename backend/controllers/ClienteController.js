class ClienteController {
  constructor(clienteRepository) {
    this.repository = clienteRepository;
  }

  async getClients(req, res) {
    const page = parseInt(req.query?.page);

    const clients = await this.repository.getClients(page);

    return res.status(200).json(clients);
  }

  async createCliente(req, res) {
    const { nome, endereco, email, telefone, tipo, cpf, cnpj } = req.body;

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
}

export default ClienteController;
