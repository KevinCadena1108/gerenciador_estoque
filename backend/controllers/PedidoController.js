class PedidoController {
  constructor(pedidosRepository) {
    this.repository = pedidosRepository;
  }

  async getRelatorio(req, res) {
    const itens = await this.repository.getRelatorio();
    const relatorio = [];

    itens.map((item) => {
      !relatorio.find((rel) => rel.codp === item.codp)
        ? relatorio.push({
            codp: item.codp,
            estado: item.estado,
            data: item.datap,
            cliente: item.cliente,
            vendedor: item.vendedor,
            carrinho: [
              {
                produto: item.produto,
                preco: item.preco,
                quantidade: item.quantidade_pedido,
              },
            ],
          })
        : relatorio
            .find((rel) => rel.codp === item.codp)
            .carrinho.push({
              produto: item.produto,
              preco: item.preco,
              quantidade: item.quantidade_pedido,
            });
    });

    relatorio.map((rel) => {
      rel.total = rel.carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
      );
    });

    return res.status(200).json(relatorio);
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

  async updatePedido(req, res) {
    const { id } = req.params;

    await this.repository.updatePedido(parseInt(id), req.body);

    return res.status(200).json({ message: "Pedido atualizado com sucesso" });
  }

  async getPedidoById(req, res) {
    const { id } = req.params;

    const pedido = await this.repository.findPedidoById(parseInt(id));

    return res.status(200).json(pedido);
  }

  async createPedido(req, res) {
    const pedido = await this.repository.createPedido(req.body);

    return res.status(200).json({ message: "Pedido criado com sucesso" });
  }

  async deletePedido(req, res) {
    const { id } = req.params;

    await this.repository.deletePedido(id);

    return res.status(200).json({ message: "Pedido deletado com sucesso" });
  }
}

export default PedidoController;
