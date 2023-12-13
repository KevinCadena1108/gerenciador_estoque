class ProdutoController {
  constructor(produtoRepository) {
    this.repository = produtoRepository;
  }

  async getProdutos(req, res) {
    const page = parseInt(req.query?.page);

    const products = await this.repository.getProdutos(page);

    return res.status(200).json(products);
  }

  async getProdutosForSelect(req, res) {
    const products = await this.repository.getProdutosForSelect();

    const withIdProducts = products.map((product) => ({
      ...product,
      label: `${product.value} - ${product.label}`,
    }));

    return res.status(200).json(withIdProducts);
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

  async deleteProduto(req, res) {
    const { id } = req.params;

    const deletedProduct = await this.repository.deleteProduto(parseInt(id));

    return res.status(200).json({ message: "Produto deletado com sucesso" });
  }

  async findProdutoById(req, res) {
    const { id } = req.params;

    const produto = await this.repository.findProdutoById(parseInt(id));

    return res.status(200).json(produto);
  }

  async updateProduto(req, res) {
    const { id } = req.params;
    const { nome, preco, quantidade, descricao } = req.body;

    if (preco <= 0) throw new AppError("Preço inválido");

    if (quantidade <= 0) throw new AppError("Quantidade inválida");

    await this.repository.updateProduto(parseInt(id), {
      nome,
      preco,
      quantidade,
      descricao,
    });

    return res.status(200).json({ message: "Produto atualizado com sucesso" });
  }
}

export default ProdutoController;
