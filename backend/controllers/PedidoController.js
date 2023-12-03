class PedidoController {
  constructor(pedidosRepository) {
    this.repository = pedidosRepository;
  }

  async getPedidos(req, res) {
    const page = parseInt(req.query?.page);

    const pedidos = await this.repository.getPedidos(page);

    return res.status(200).json(pedidos);
  }
}

export default PedidoController;
