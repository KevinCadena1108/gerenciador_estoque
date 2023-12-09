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
          pedido.produtoId,
          pedido.quantidade,
        ]);
        await db.none(removeEstoque, [pedido.quantidade, pedido.produtoId]);
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
      query += "GROUP BY pr.nome LIMIT 20;";

      return await db.any(query);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getTotalPedidos() {
    try {
      let query =
        "SELECT coalesce(sum(p.preco), 0) as valor FROM itempedido i NATURAL JOIN produto p LIMIT 20;";

      return await db.one(query);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default PedidoRepository;
