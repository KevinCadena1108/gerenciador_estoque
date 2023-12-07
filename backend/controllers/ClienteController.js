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
  async updateCliente(req, res) {
    const { id } = req.params;
    const { nome, endereco, email, telefone, tipo, cpf, cnpj } = req.body;

    try {
      const updatedClient = await this.repository.updateClient(id, {
        nome,
        endereco,
        email,
        telefone,
        tipo,
        cpf,
        cnpj,
      });

      if (!updatedClient) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Cliente atualizado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar cliente", error: error.message });
    }
  }

  async deleteCliente(req, res) {
    const { id } = req.params;

    try {
      const deletedClient = await this.repository.deleteClient(id);

      if (!deletedClient) {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Cliente deletado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar cliente", error: error.message });
    }
  }
}

export default ClienteController;
