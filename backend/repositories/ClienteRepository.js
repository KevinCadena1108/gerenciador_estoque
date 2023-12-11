import AppError from "../AppError.js";
import db from "../db.js";

class ClienteRepository {
  async createClient({ nome, endereco, email, telefone, tipo, cpf, cnpj }) {
    try {
      return await db.none(
        "INSERT INTO cliente (nome, endereco, email, telefone, tipo, cpf, cnpj) VALUES ($1, $2, $3, $4, $5, $6, $7);",
        [nome, endereco, email, telefone, tipo, cpf, cnpj]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async findByEmail(email) {
    try {
      return db.any("SELECT * FROM cliente WHERE email = $1;", [email]);
    } catch (error) {
      throw new AppError(error);
    }
  }

  async findById(id) {
    try {
      return await db.one(
        "SELECT idc, nome, endereco, email, telefone, tipo, cpf, cnpj FROM cliente WHERE idc = $1;",
        [id]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getClients(page) {
    try {
      return await db.any(
        "SELECT idc as id, nome, endereco, email, telefone, tipo FROM cliente ORDER BY idc DESC LIMIT 20 OFFSET $1;",
        [page * 20]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async getClientsAutocomplete() {
    try {
      return await db.any("SELECT idc as id, nome as label FROM cliente;");
    } catch (error) {
      throw new AppError(error);
    }
  }

  async deleteClient(id) {
    try {
      await db.none("DELETE FROM cliente WHERE idc = $1;", [id]);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default ClienteRepository;
