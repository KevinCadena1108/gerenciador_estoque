import { api } from "../../services/api";

export const getPedidos = async (page) => {
  const { data } = await api.get(`/pedido/?page=${page}`);
  return data;
};
