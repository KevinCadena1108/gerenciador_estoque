import AppError from "../AppError.js";
import db from "../db.js";

class PedidoRepository {
  async createPedido(pedido) {
    try {
      let queryPedido =
        "INSERT INTO pedido (idu, idc, estado, datap) VALUES ($1, $2, $3, $4) RETURNING codp;";
      let queryItemPedido =
        "INSERT INTO itempedido (codp, idp, quantidade_pedido) VALUES ($1, $2, $3);";
      let removeEstoque =
        "UPDATE produto SET quantidade_estoque = quantidade_estoque - $1 WHERE idp = $2;";

      const { codp } = await db.one(queryPedido, [
        pedido.vendedor,
        pedido.cliente,
        pedido.estado,
        pedido.data,
      ]);

      pedido?.carrinho?.map(async (pedido) => {
        await db.none(queryItemPedido, [
          codp,
          pedido.produtoid,
          pedido.quantidade,
        ]);
        await db.none(removeEstoque, [pedido.quantidade, pedido.produtoid]);
      });
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getPedidos(page) {
    try {
      let query =
        "SELECT pe.codp as codigo, c.nome as cliente, u.nome as vendedor, pe.estado, to_char(pe.datap, 'DD/MM/YYYY') as data_pagamento ";
      query +=
        "FROM pedido pe NATURAL JOIN cliente c JOIN usuario u ON u.idu = pe.idu ";
      query += "ORDER BY pe.codp DESC LIMIT 20 OFFSET $1;";

      return await db.any(query, [page * 20]);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getPedidosForChart() {
    try {
      let query =
        "SELECT pr.nome as produto, sum(i.quantidade_pedido)::DECIMAL as quantidade ";
      query += "FROM itempedido i NATURAL JOIN produto pr ";
      query +=
        "GROUP BY pr.nome LIMIT (SELECT count(i2.*) FROM pedido p2 NATURAL JOIN itempedido i2 LIMIT 20);";

      return await db.any(query);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getTotalPedidos() {
    try {
      let query =
        "WITH quantidadeItens AS (SELECT count(i2.*) AS quantidade_itens FROM pedido p2 NATURAL JOIN itempedido i2 LIMIT 20), ";
      query +=
        "precosPedidos AS (SELECT i.idi, p.preco*i.quantidade_pedido AS valor FROM itempedido i NATURAL JOIN produto p LIMIT (SELECT quantidade_itens FROM quantidadeItens)) ";
      query +=
        "SELECT coalesce(sum(pp.valor), 0) as valor FROM precosPedidos pp;";

      return await db.one(query);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async findPedidoById(id) {
    try {
      let pedido =
        "SELECT pe.codp as codigo, c.nome as cliente, c.idc as cliente_id, u.idu as vendedor_id, u.nome as vendedor, pe.estado, to_char(pe.datap, 'DD/MM/YYYY') as data ";
      pedido +=
        "FROM pedido pe NATURAL JOIN cliente c JOIN usuario u ON u.idu = pe.idu ";
      pedido += "WHERE pe.codp = $1;";

      let itens =
        "SELECT p.idp as produtoid, p.nome as produto, i.quantidade_pedido as quantidade, p.preco ";
      itens += "FROM itempedido i NATURAL JOIN produto p WHERE codp = $1;";

      const pedidoRetorno = await db.one(pedido, [id]);
      const itensRetorno = await db.any(itens, [id]);

      return { ...pedidoRetorno, carrinho: itensRetorno };
    } catch (error) {
      throw new AppError(error);
    }
  }

  async updatePedido(id, pedido) {
    try {
      let queryPedido =
        "UPDATE pedido SET estado = $1, datap = $2, idc = $3, idu = $4 WHERE codp = $5;";
      let getItensPedido = "SELECT * FROM itempedido WHERE codp = $1;";
      let addEstoque =
        "UPDATE produto SET quantidade_estoque = quantidade_estoque + $1 WHERE idp = $2;";
      let removeEstoque =
        "UPDATE produto SET quantidade_estoque = quantidade_estoque - $1 WHERE idp = $2;";
      let queryDeleteItensPedido = "DELETE FROM itempedido WHERE codp = $1;";
      let queryAddNewItemPedido =
        "INSERT INTO itempedido (codp, idp, quantidade_pedido) VALUES ($1, $2, $3);";

      await db.none(queryPedido, [
        pedido.estado,
        pedido.data,
        pedido.cliente,
        pedido.vendedor,
        id,
      ]);

      const itensPedido = await db.any(getItensPedido, [id]);

      itensPedido?.map(async (item) => {
        await db.none(addEstoque, [item.quantidade_pedido, item.idp]);
      });

      await db.none(queryDeleteItensPedido, [id]);

      pedido?.carrinho?.map(async (produto) => {
        await db.none(queryAddNewItemPedido, [
          id,
          produto.produtoid,
          produto.quantidade,
        ]);
        await db.none(removeEstoque, [produto.quantidade, produto.produtoid]);
      });
    } catch (error) {
      throw new AppError(error);
    }
  }

  async deletePedido(id) {
    try {
      let queryPedido = "DELETE FROM pedido WHERE codp = $1;";
      let queryItemPedido = "DELETE FROM itempedido WHERE codp = $1;";

      await db.none(queryItemPedido, [id]);
      await db.none(queryPedido, [id]);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getRelatorio() {
    try {
      let itensPedidos =
        "SELECT p.codp, c.nome AS cliente, u.nome AS vendedor, p.estado, p.datap, p2.nome AS produto, p2.preco, i.quantidade_pedido  FROM pedido p ";
      itensPedidos +=
        "NATURAL JOIN cliente c JOIN usuario u ON u.idu = p.idu JOIN itempedido i ON i.codp = p.codp JOIN produto p2 ON p2.idp = i.idp ";
      itensPedidos +=
        "WHERE date_trunc('month', p.datap) = date_trunc('month',current_date) ORDER BY p.codp DESC;";

      return db.any(itensPedidos);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default PedidoRepository;
