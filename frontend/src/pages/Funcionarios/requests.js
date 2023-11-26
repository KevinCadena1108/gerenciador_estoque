import { api } from "../../services/api";

export const getUsers = async (page) => {
  const { data } = await api.get(`/user/?page=${page}`);
  return data;
};
