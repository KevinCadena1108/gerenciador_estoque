import { api } from "../../services/api";

export const getCliente = async (id) => {
  const { data } = await api.get(`/cliente/recover/${id}`);
  return data;
};

export const createCliente = async (cliente) => {
  const response = await api.post("/cliente", cliente);
  return response;
};

export const updateCliente = async (id, cliente) => {
  const response = await api.put(`/cliente/${id}`, cliente);
  return response;
};

export const deleteCliente = async (id) => {
  const response = await api.delete(`/cliente/${id}`);
  return response;
};
