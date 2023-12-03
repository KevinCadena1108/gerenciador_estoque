import AppError from "../AppError.js";
import db from "../db.js";

class PedidoRepository {
  async getPedidos(page) {
    try {
      let query =
        "SELECT pe.codp as codigo, c.nome as cliente, u.nome as vendedor, pe.estado, pe.datap as data_pagamento ";
      query += "FROM pedido pe NATURAL JOIN cliente c NATURAL JOIN usuario u ";
      query += "ORDER BY pe.codp ASC LIMIT 20 OFFSET $1;";

      return await db.any(query, [page * 20]);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default PedidoRepository;
