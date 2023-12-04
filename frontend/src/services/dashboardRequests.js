import { api } from "./api";

export const getChartInfo = async () => {
  const { data } = await api.get("/pedido/chart");
  return data;
};

export const getTotalInfo = async () => {
  const { data } = await api.get("/pedido/total");
  return data;
};
