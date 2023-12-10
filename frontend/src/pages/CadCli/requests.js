import { api } from "../../services/api";

export const createCliente = async (cliente) => {
  try {
    const response = await api.post("/cliente", cliente);
    return response;
  } catch (error) {
    return error.response;
  }
};
