class ProdutoController {
  constructor(produtoRepository) {
    this.repository = produtoRepository;
  }

  async getProdutos(req, res) {
    const page = parseInt(req.query?.page);

    const products = await this.repository.getProdutos(page);

    return res.status(200).json(products);
  }

  async createProduto(req, res) {
    const { nome, preco, quantidade, descricao } = req.body;

    if (preco <= 0) throw new AppError("Preço inválido");

    if (quantidade <= 0) throw new AppError("Quantidade inválida");

    await this.repository.createProduto({
      nome,
      preco,
      quantidade,
      descricao,
    });

    return res.status(200).json({ message: "Produto criado com sucesso" });
  }
}

export default ProdutoController;
