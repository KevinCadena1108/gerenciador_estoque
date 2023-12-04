class PedidoController {
  constructor(pedidosRepository) {
    this.repository = pedidosRepository;
  }

  async getPedidos(req, res) {
    const page = parseInt(req.query?.page);

    const pedidos = await this.repository.getPedidos(page);

    return res.status(200).json(pedidos);
  }

  async getPedidosForChart(req, res) {
    const pedidos = await this.repository.getPedidosForChart();

    return res.status(200).json(pedidos);
  }

  async getTotalPedidos(req, res) {
    const total = await this.repository.getTotalPedidos();

    return res.status(200).json(total);
  }
}

export default PedidoController;
