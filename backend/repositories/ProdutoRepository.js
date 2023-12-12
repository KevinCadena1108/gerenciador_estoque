import AppError from "../AppError.js";
import db from "../db.js";

class ProdutoRepository {
  async getProdutos(page) {
    try {
      return await db.any(
        "SELECT idp as id, nome, descricao, preco, quantidade_estoque FROM produto ORDER BY idp DESC LIMIT 20 OFFSET $1;",
        [page * 20]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getProdutosForSelect() {
    try {
      return await db.any(
        "SELECT idp as value, nome as label, preco as price FROM produto ORDER BY idp DESC;"
      );
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

  async findProdutoById(id) {
    try {
      return await db.one(
        "SELECT idp as id, nome, descricao, preco, quantidade_estoque as quantidade FROM produto WHERE idp = $1;",
        [id]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async updateProduto(id, { nome, preco, quantidade, descricao }) {
    try {
      await db.none(
        "UPDATE produto SET nome = $1, preco = $2, quantidade_estoque = $3, descricao = $4 WHERE idp = $5;",
        [nome, preco, quantidade, descricao, id]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async deleteProduto(id) {
    try {
      await db.none("DELETE FROM produto WHERE idp = $1;", [id]);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default ProdutoRepository;
