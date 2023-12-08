import { api } from "../../services/api";

export const getProdutosForSelect = async () => {
  const { data } = await api.get(`/produto/select`);
  return data;
};
