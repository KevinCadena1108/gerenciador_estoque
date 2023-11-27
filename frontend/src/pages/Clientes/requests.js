import { api } from "../../services/api";

export const getClientes = async (page) => {
  const { data } = await api.get(`/cliente/?page=${page}`);
  return data;
};
