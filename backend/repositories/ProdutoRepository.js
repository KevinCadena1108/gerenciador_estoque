import AppError from "../AppError.js";
import db from "../db.js";

class ProdutoRepository {
  async getProdutos(page) {
    try {
      return await db.any(
        "SELECT idp as id, nome, descricao, preco, quantidade_estoque FROM produto ORDER BY idp ASC LIMIT 20 OFFSET $1;",
        [page * 20]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getProdutosForSelect() {
    try {
      return await db.any("SELECT idp as value, nome as label FROM produto;");
    } catch (error) {
      throw new AppError(error);
    }
  }

  async createProduto({ nome, preco, quantidade, descricao }) {
    try {
      await db.none(
        "INSERT INTO produto (nome, preco, quantidade_estoque, descricao) VALUES ($1, $2, $3, $4);",
        [nome, preco, quantidade, descricao]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default ProdutoRepository;
