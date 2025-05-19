// Function for formatting datetime (YYYY-MM-DD (UTC HH:MM:SS))
export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const pad = (n) => n.toString().padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    " (UTC " +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    ")"
  );
}

// User-friendly names for column names
export const FIELD_LABELS = {
  itemId: "ID",
  id: "ID",
  _id: "ID",
  name: "Name",
  description: "Description",
  sku: "SKU",
  price: "Price",
  quantity: "Quantity",
  createdAt: "Creation Date",
};

// Self-explanatory function to get field names from items
export function getFields(items) {
  if (!items || items.length === 0) return [];
  return Object.keys(items[0]);
}
