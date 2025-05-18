import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  return data;
}

export async function register(username, email, password) {
  const { data } = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
  return data;
}