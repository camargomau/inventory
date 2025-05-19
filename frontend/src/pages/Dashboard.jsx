import { useEffect, useState } from "react";
import { getItems, addItem, updateItem, deleteItem } from "../api/items";
import { Button, Group, Title, Loader, Center } from "@mantine/core";
import InventoryTable from "../components/InventoryTable";
import AddItemModal from "../components/AddItemModal";
import { exportInventoryPdf } from "../utils/exportPdf";

export default function Dashboard({ token, setToken }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedIds, setEditedIds] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [addedIds, setAddedIds] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addError, setAddError] = useState("");

  // Fetch items on mount or refresh
  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems(token);
      setItems(data);
      setEditedIds([]);
      setDeletedIds([]);
      setAddedIds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  // Add handler
  const handleAdd = async (item) => {
    setAddError("");
    try {
      const newItem = await addItem(item, token);
      setItems((prev) => [...prev, newItem]);
      setAddedIds((prev) => [...prev, newItem.id || newItem.itemId || newItem._id || newItem.ID]);
      setAddModalOpen(false);
    } catch (err) {
      setAddError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to add item"
      );
    }
  };

  // Edit handler
  const handleEdit = async (id, newData) => {
    await updateItem(id, newData, token);
    setItems((prev) =>
      prev.map((item) => (item.id === id || item.itemId === id || item._id === id || item.ID === id ? { ...item, ...newData } : item))
    );
    setEditedIds((prev) => [...new Set([...prev, id])]);
  };

  // Delete handler
  const handleDelete = async (id) => {
    await deleteItem(id, token);
    setDeletedIds((prev) => [...new Set([...prev, id])]);
  };

  // Refresh handler
  const handleRefresh = () => {
    fetchItems();
  };

  // Export handler
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

  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <div>
      <Group justify="space-between" mb="md">
        <Title order={2}>Inventory Dashboard</Title>
        <Group>
          <Button onClick={() => setAddModalOpen(true)}>Add New Entry</Button>
        </Group>
      </Group>
      <InventoryTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
        onExport={handleExport}
        editedIds={editedIds}
        deletedIds={deletedIds}
        addedIds={addedIds}
      />
      <AddItemModal
        opened={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setAddError("");
        }}
        onAdd={handleAdd}
        error={addError}
      />
    </div>
  );
}
