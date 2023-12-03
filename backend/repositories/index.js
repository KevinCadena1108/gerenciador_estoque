import UsuarioRepository from "./UsuarioRepository.js";
import ClienteRepository from "./ClienteRepository.js";
import ProdutoRepository from "./ProdutoRepository.js";
import PedidoRepository from "./PedidoRepository.js";

export const usuarioRepository = new UsuarioRepository();
export const clienteRepository = new ClienteRepository();
export const produtoRepository = new ProdutoRepository();
export const pedidoRepository = new PedidoRepository();
