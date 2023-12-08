import AppError from "../AppError.js";
import db from "../db.js";

class PedidoRepository {
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
