import { api } from "../../services/api";

export const createEstoque = async (estoque) => {
  try {
    const response = await api.post("/produto", estoque);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const updateEstoque = async (id, estoque) => {
  try {
    const response = await api.put(`/produto/${id}`, estoque);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteEstoque = async (id) => {
  try {
    const response = await api.delete(`/estoque/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};