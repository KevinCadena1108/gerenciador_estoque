import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:3010",
});

if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
