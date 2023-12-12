import { api } from "../../services/api";

export const getCliente = async (id) => {
  try {
    const { data } = await api.get(`/cliente/recover/${id}`);
    return data;
  } catch (error) {
    return error.response;
  }
};

export const createCliente = async (cliente) => {
  try {
    const response = await api.post("/cliente", cliente);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateCliente = async (id, cliente) => {
  try {
    const response = await api.put(`/cliente/${id}`, cliente);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteCliente = async (id) => {
  try {
    const response = await api.delete(`/cliente/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
