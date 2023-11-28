import { api } from "../../services/api";

export const getProdutos = async (page) => {
  const { data } = await api.get(`/produto/?page=${page}`);
  return data;
};
