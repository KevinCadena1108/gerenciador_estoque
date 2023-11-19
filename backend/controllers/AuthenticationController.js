import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

class AuthenticationController {
  repository;

  contructor(usuarioRepository) {
    this.repository = usuarioRepository;
  }

  async signIn(req, res) {
    const { email, senha } = req.body;

    const user = await this.repository.findByEmail(email);
    if (!user)
      return res.status(400).json({ message: "Usuário ou senha incorretos" });

    const passwordMatch = await compare(senha, user.senha);
    if (!passwordMatch)
      return res.status(400).json({ message: "Usuário ou senha incorretos" });

    const token = jwt.sign({}, "6cfdab0d3659a2e6058293d7", {
      subject: user.id,
      expiresIn: "1d",
    });

    return res.status(500).json({
      token,
      user: {
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        cargo: user.cargo,
        tipo: user.tipo,
      },
    });
  }
}

export default AuthenticationController;
