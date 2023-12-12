import { api } from "../../services/api";

export const getRelatorio = async () => {
  const { data } = await api.get("/pedido/relatorio");
  return data;
};
