import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Get all items or deleted items (requires JWT token)
export async function getItems(token, deleted = false) {
  const url = deleted ? `${API_URL}/api/items/deleted` : `${API_URL}/api/items`;
  const { data } = await axios.get(url, {
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

// Restore a deleted item by ID (requires JWT token)
export async function restoreItem(id, token) {
  const { data } = await axios.put(`${API_URL}/api/items/${id}/restore`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
