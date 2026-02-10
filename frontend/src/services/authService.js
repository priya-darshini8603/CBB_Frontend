import axios from "axios";

const API_BASE = "http://localhost:8080";

export const registerUser = async (data) => {
  return axios.post(`${API_BASE}/auth/register`, data);
};
