import AppError from "../AppError.js";
import db from "../db.js";

class ClienteRepository {
  async createUser({ nome, endereco, email, telefone, tipo }) {
    try {
      await db.none(
        "INSERT INTO cliente (nome, endereco, email, telefone, tipo) VALUES ($1, $2, $3, $4, $5);",
        [nome, endereco, email, telefone, tipo]
      );

      return;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async findByEmail(email) {
    try {
      return db.any("SELECT * FROM cliente WHERE email = $1;", [email]);
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async findById(id) {
    try {
      return await db.one(
        "SELECT idc, nome, endereco, email,  telefone, tipo FROM cliente WHERE idc = $1;",
        [id]
      );
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getUsers(page) {
    try {
      return await db.any(
        "SELECT idc as id, nome, endereco, email,  telefone, tipo FROM cliente ORDER BY idc ASC LIMIT 20 OFFSET $1;",
        [page * 20]
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ClienteRepository;
