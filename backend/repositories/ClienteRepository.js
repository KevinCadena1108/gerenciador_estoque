import AppError from "../AppError.js";
import db from "../db.js";

class ClienteRepository {
  async getClients(page) {
    try {
      return await db.any(
        "SELECT idc as id, nome, endereco, email, telefone, tipo FROM cliente ORDER BY idc ASC LIMIT 20 OFFSET $1;",
        [page * 20]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default ClienteRepository;
