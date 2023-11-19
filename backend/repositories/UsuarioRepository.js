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

  async getAllUsers() {
    try {
      return await db.any(
        "SELECT idu, nome, telefone, cargo, email, tipo FROM usuario;"
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UsuarioRepository;
