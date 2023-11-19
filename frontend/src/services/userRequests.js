import { api } from "./api";

export const login = async (email, senha) => {
  const { data } = await api.post("/auth/signin", { email, senha });
  return data;
};

export const getUser = async () => {
  const { data } = await api.get(`/user/recover`);
  return data;
};
