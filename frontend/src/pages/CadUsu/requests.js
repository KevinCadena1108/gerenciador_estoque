import { api } from "../../services/api";

export const cadastrarUsuario = async (user) => {
  try {
    const response = await api.post("/user", user);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const atualizarUsuario = async (id, user) => {
  try {
    const response = await api.put(`/user/${id}`, user);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deletarUsuario = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};