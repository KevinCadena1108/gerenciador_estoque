class ProdutoController {
  constructor(produtoRepository) {
    this.repository = produtoRepository;
  }

  async getProdutos(req, res) {
    const page = parseInt(req.query?.page);

    const products = await this.repository.getProdutos(page);

    return res.status(200).json(products);
  }
}

export default ProdutoController;
