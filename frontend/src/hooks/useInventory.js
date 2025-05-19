import { useState, useEffect } from "react";
import { getItems, addItem, updateItem, deleteItem, restoreItem } from "../api/items";
import { exportInventoryPdf } from "../utils/exportPdf";

// Handles inventory logic: fetching, adding, editing, deleting, exporting, and viewing/restoring deleted items
// Similar to useAuthForm, this hook manages state and API calls for inventory
export function useInventory(token) {
  // List of inventory items
  const [items, setItems] = useState([]);
 // Indicates if a request is in progress (for loading spinners, etc.)
  const [loading, setLoading] = useState(true);
  // Track edited, deleted, and added item IDs for UI feedback (row highlight colours)
  const [editedIds, setEditedIds] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [addedIds, setAddedIds] = useState([]);
  // Modal and error state for adding items
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addError, setAddError] = useState("");
  // State for deleted view
  const [showDeleted, setShowDeleted] = useState(false);

  // Fetch items from API on mount or refresh
  const fetchItems = async (deleted = false) => {
    setLoading(true);
    try {
      const data = await getItems(token, deleted);
      setItems(data);
      // Reset change trackers on fetch
      setEditedIds([]);
      setDeletedIds([]);
      setAddedIds([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch items when hook mounts or showDeleted changes
  useEffect(() => {
    fetchItems(showDeleted);
  }, [showDeleted]);

  // Add item handler: calls API, updates state, handles errors
  const handleAdd = async (item) => {
    setAddError("");
    try {
      const newItem = await addItem(item, token);
      setItems((prev) => [...prev, newItem]);
      setAddedIds((prev) => [...prev, newItem.id || newItem.itemId || newItem._id || newItem.ID]);
      setAddModalOpen(false);
    } catch (err) {
      // Friendlier error for duplicate SKU
      const apiMsg = err.response?.data?.message || err.response?.data?.error || err.message || "Failed to add item";
      if (apiMsg && /sku.*exist|duplicate.*sku|unique.*sku|sku.*already/i.test(apiMsg)) {
        setAddError("SKU already exists. Please use a unique SKU.");
      } else {
        setAddError(apiMsg);
      }
    }
  };

  // Edit item handler: calls API, updates state, tracks edited IDs
  const handleEdit = async (id, newData) => {
    await updateItem(id, newData, token);
    setItems((prev) =>
      prev.map((item) => (item.id === id || item.itemId === id || item._id === id || item.ID === id ? { ...item, ...newData } : item))
    );
    setEditedIds((prev) => [...new Set([...prev, id])]);
  };

  // Delete item handler: calls API, tracks deleted IDs
  const handleDelete = async (id) => {
    await deleteItem(id, token);
    setDeletedIds((prev) => [...new Set([...prev, id])]);
  };

  // Restore item handler: calls API, updates state
  const handleRestore = async (id) => {
    await restoreItem(id, token);
    fetchItems(true);
  };

  // Toggle between normal and deleted view
  const toggleShowDeleted = () => setShowDeleted((v) => !v);

  // Refresh handler: re-fetches items
  const handleRefresh = () => {
    fetchItems(showDeleted);
  };

  // Export handler: exports inventory as PDF, styles rows by change type
  const handleExport = () => {
    if (items.length === 0) return;
    const fields = Object.keys(items[0]);
    exportInventoryPdf(
      items,
      fields,
      (id) => {
        if (deletedIds.includes(id)) return { background: "#ffeaea", textDecoration: "line-through" };
        if (addedIds.includes(id)) return { background: "#eaffea" };
        if (editedIds.includes(id)) return { background: "#eaf0ff" };
        return {};
      }
    );
  };

  // Return state and handlers for use in components
  return {
    items,
    loading,
    editedIds,
    deletedIds,
    addedIds,
    addModalOpen,
    setAddModalOpen,
    addError,
    setAddError,
    handleAdd,
    handleEdit,
    handleDelete,
    handleRefresh,
    handleExport,
    showDeleted,
    toggleShowDeleted,
    handleRestore,
  };
}
