import { useState, useEffect } from "react";
import { Center, Loader, Group, Button, Title, Flex } from "@mantine/core";
import InventoryTable from "../components/dashboard/InventoryTable";
import AddItemModal from "../components/dashboard/AddItemModal";
import InventoryControls from "../components/dashboard/InventoryControls";
import { useInventory } from "../hooks/useInventory";
import { Plus } from "lucide-react";

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

  // State for visible fields (lifted from InventoryTable)
  const [visibleFields, setVisibleFields] = useState(items.length > 0 ? Object.keys(items[0]) : []);

  // State for add item modal
  // 0 to reset the modal every time
  const [addModalKey, setAddModalKey] = useState(0);

  // Update visibleFields when items change (e.g., after adding first item)
  useEffect(() => {
    setVisibleFields(items.length > 0 ? Object.keys(items[0]) : []);
  }, [items]);

  // Field visibility toggle handler
  const handleFieldToggle = (field) => {
    setVisibleFields((fields) =>
      fields.includes(field)
        ? fields.filter((f) => f !== field)
        : [...fields, field]
    );
  };

  // Show loader while inventory is loading
  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  // Render dashboard with inventory table, inventory controrls and add item modal
  return (
    <div>
      {/* Header with title and sign out button */}
      <Group justify="space-between" mb="md">
        <Title order={2}>Dashboard</Title>
        <Group>
          <Button
            variant="outline"
            color="red"
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
            }}
          >
            Sign Out
          </Button>
        </Group>
      </Group>

      {/* Controls and Add Item button in the same row */}
      <Flex justify="space-between" align="center" mb="md">
        <InventoryControls
          fields={items.length > 0 ? Object.keys(items[0]) : []}
          visibleFields={visibleFields}
          onFieldToggle={handleFieldToggle}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />
        <Button
          onClick={() => {
            setAddModalOpen(true);
            setAddModalKey((k) => k + 1);
          }}
          leftSection={<Plus size={16} />}
        >
          Add Item
        </Button>
      </Flex>

      {/* Modal for adding a new item */}
      <AddItemModal
        key={addModalKey}
        opened={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setAddError("");
          setAddModalKey((k) => k + 1);
        }}
        onAdd={handleAdd}
        error={addError}
      />

      {/* Inventory table */}
      <InventoryTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={handleRefresh}
        onExport={handleExport}
        editedIds={editedIds}
        deletedIds={deletedIds}
        addedIds={addedIds}
        visibleFields={visibleFields}
        onFieldToggle={handleFieldToggle}
      />
    </div>
  );
}
