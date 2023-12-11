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

export const getPedido = async (id) => {
  const { data } = await api.get(`/pedido/${id}`);
  return data;
};

export const updatePedido = async (id, pedido) => {
  const response = await api.put(`/pedido/${id}`, pedido);
  return response;
};

export const deletePedido = async (id) => {
  const response = await api.delete(`/pedido/${id}`);
  return response;
};

export const criarPedido = async (pedido) => {
  const response = await api.post(`/pedido`, pedido);
  return response;
};
