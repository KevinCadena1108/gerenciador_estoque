import { api } from "../../services/api";

export const getClientes = async (page) => {
  try {
    const { data } = await api.get(`/cliente/?page=${page}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
