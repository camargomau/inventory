import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Login user with email and password
export async function login(email, password) {
  const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  return data;
}

// Register a new user with username, email, and password
export async function register(username, email, password) {
  const { data } = await axios.post(`${API_URL}/api/auth/register`, { username, email, password });
  return data;
}
