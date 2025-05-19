import { Center, Loader, Group, Button, Title } from "@mantine/core";
import InventoryTable from "../components/dashboard/InventoryTable";
import AddItemModal from "../components/dashboard/AddItemModal";
import { useInventory } from "../hooks/useInventory";

// Dashboard page: displays inventory table and add item modal, manages inventory state
export default function Dashboard({ token, setToken }) {
  // Use custom hook for inventory logic and state
  const {
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
  } = useInventory(token);

  // Show loader while inventory is loading
  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  // Render dashboard with inventory table and add item modal
  return (
    <div>
      {/* Header with title and add button */}
      <Group justify="space-between" mb="md">
        <Title order={2}>Inventory Dashboard</Title>
        <Group>
          <Button onClick={() => setAddModalOpen(true)}>Add Item</Button>
        </Group>
      </Group>
      {/* Inventory table with edit/delete/refresh/export */}
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
      {/* Modal for adding a new item */}
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
