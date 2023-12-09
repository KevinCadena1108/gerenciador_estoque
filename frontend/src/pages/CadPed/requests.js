import { api } from "../../services/api";

export const getProdutosForSelect = async () => {
  const { data } = await api.get(`/produto/select`);
  return data;
};

export const getUsuariosAutocomplete = async () => {
  const { data } = await api.get(`/user/autocomplete`);
  return data;
};

export const getClientesAutocomplete = async () => {
  const { data } = await api.get(`/cliente/autocomplete`);
  return data;
};

export const criarPedido = async (pedido) => {
  const response = await api.post(`/pedido`, pedido);
  return response;
};
