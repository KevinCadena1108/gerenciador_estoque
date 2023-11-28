import AppError from "../AppError.js";
import db from "../db.js";

class ProdutoRepository {
  async getProdutos(page) {
    try {
      return await db.any(
        "SELECT idp as id, nome, descricao, preco, quantidade_estoque FROM produto ORDER BY idc ASC LIMIT 20 OFFSET $1;",
        [page * 20]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default ProdutoRepository;
