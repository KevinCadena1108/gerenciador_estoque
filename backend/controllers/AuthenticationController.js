import { compare } from "bcrypt";
import AppError from "../AppError.js";
import jwt from "jsonwebtoken";

class AuthenticationController {
  constructor(usuarioRepository) {
    this.repository = usuarioRepository;
  }

  async signIn(req, res) {
    const { email, senha } = req.body;

    const user = await this.repository.findByEmail(email);
    if (user.length === 0) throw new AppError("Usuário ou senha incorretos");

    const passwordMatch = await compare(senha, user[0].senha);
    if (!passwordMatch) throw new AppError("Usuário ou senha incorretos");

    const token = jwt.sign({}, "6cfdab0d3659a2e6058293d7", {
      subject: `${user[0].idu}`,
      expiresIn: "1d",
    });

    return res.status(500).json({
      token,
      user: {
        nome: user[0].nome,
        email: user[0].email,
        telefone: user[0].telefone,
        cargo: user[0].cargo,
        tipo: user[0].tipo,
      },
    });
  }
}

export default AuthenticationController;
