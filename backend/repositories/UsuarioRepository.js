import AppError from "../AppError.js";
import db from "../db.js";

class UsuarioRepository {
  async createUser({ nome, email, senha, telefone, cargo, tipo }) {
    try {
      await db.none(
        "INSERT INTO usuario (nome, email, senha, telefone, cargo, tipo) VALUES ($1, $2, $3, $4, $5, $6);",
        [nome, email, senha, telefone, cargo, tipo]
      );

      return;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async findByEmail(email) {
    try {
      return db.any("SELECT * FROM usuario WHERE email = $1;", [email]);
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async findById(id) {
    try {
      return await db.one(
        "SELECT idu, nome, email, telefone, cargo, tipo FROM usuario WHERE idu = $1;",
        [id]
      );
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getUsersAutocomplete() {
    try {
      return await db.any("SELECT idu as id, nome as label FROM usuario;");
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  async getUsers(page) {
    try {
      return await db.any(
        "SELECT idu as id, nome, telefone, cargo, email, tipo FROM usuario ORDER BY idu DESC LIMIT 20 OFFSET $1;",
        [page * 20]
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(id, { nome, email, telefone, cargo, tipo }) {
    try {
      await db.none(
        "UPDATE usuario SET nome = $1, email = $2, telefone = $3, cargo = $4, tipo = $5 WHERE idu = $6;",
        [nome, email, telefone, cargo, tipo, id]
      );
    } catch (error) {
      throw new AppError(error);
    }
  }

  async deleteUser(id) {
    try {
      await db.none("DELETE FROM usuario WHERE idu = $1;", [id]);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UsuarioRepository;
