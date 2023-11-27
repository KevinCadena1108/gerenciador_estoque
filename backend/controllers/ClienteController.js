import AppError from "../AppError.js";

class ClienteController {
  constructor(clienteRepository) {
    this.repository = clienteRepository;
  }

  async getClients(req, res) {
    const page = parseInt(req.query?.page);

    const clients = await this.repository.getClients(page);

    return res.status(200).json(clients);
  }
}

export default ClienteController;
