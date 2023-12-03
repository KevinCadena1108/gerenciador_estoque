import { api } from "../../services/api";

export const cadastrarUsuario = async (user) => {
  try {
    const response = await api.post("/user", user);
    return response;
  } catch (error) {
    return error.response;
  }
};
