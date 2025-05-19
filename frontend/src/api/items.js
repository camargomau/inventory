import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get all items (requires JWT token)
export async function getItems(token) {
  const { data } = await axios.get(`${API_URL}/api/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

// Add a new item (requires JWT token)
export async function addItem(item, token) {
  const { data } = await axios.post(`${API_URL}/api/items`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

// Update an item by ID (requires JWT token)
export async function updateItem(id, item, token) {
  const { data } = await axios.put(`${API_URL}/api/items/${id}`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

// Delete an item by ID (requires JWT token)
export async function deleteItem(id, token) {
  const { data } = await axios.delete(`${API_URL}/api/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
