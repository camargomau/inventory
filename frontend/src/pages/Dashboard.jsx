import { useState, useEffect, useMemo } from "react";
import { Center, Loader, Group, Button, Title, Flex } from "@mantine/core";
import InventoryTable from "../components/dashboard/InventoryTable";
import AddItemModal from "../components/dashboard/AddItemModal";
import InventoryControls from "../components/dashboard/InventoryControls";
import { useInventory } from "../hooks/useInventory";
import { Plus, User, LogOut, Trash2, Package } from "lucide-react";
import { getUsernameFromToken } from "../utils/jwt";

// Dashboard page: displays inventory table and add item modal, manages inventory state
export default function Dashboard({ token, setToken }) {
  // Use custom hook for inventory logic and state
  const {
    items,
    loading,
    editedIds,
    deletedIds,
    addedIds,
    restoredIds,
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
  } = useInventory(token);

  // Extract username from token
  const username = useMemo(() => getUsernameFromToken(token), [token]);

  // State for visible fields
  const [visibleFields, setVisibleFields] = useState(["itemId", "name", "sku", "price", "quantity"]);

  // State for add item modal reset
  const [addModalKey, setAddModalKey] = useState(0);

  // Field visibility toggle handler
  const handleFieldToggle = (field) => {
    setVisibleFields((fields) =>
      fields.includes(field)
        ? fields.filter((f) => f !== field)
        : [...fields, field]
    );
  };

  // Render dashboard with inventory table, inventory controrls and add item modal
  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Header with title, username, and sign out button */}
      <Group justify="space-between" mb="md">
        <Group>
          {/* Inventory icon and title */}
          <Package size={32}/>
          <Title order={2}>Inventory</Title>
        </Group>
        <Group>
          {/* Show username */}
          {username && (
            <Button
              variant="subtle"
              disabled
              leftSection={<User size={16} />}
              style={{
                cursor: "default",
                color: "var(--mantine-color-gray-6)",
              }}
            >
              {username}
            </Button>
          )}

          {/* Sign out button */}
          <Button
            variant="outline"
            color="red"
            leftSection={<LogOut size={16} />}
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
        { /* Inventory controls for field visibility, refresh, export, and view toggle */ }
        <InventoryControls
          fields={items.length > 0 ? Object.keys(items[0]) : []}
          visibleFields={visibleFields}
          onFieldToggle={handleFieldToggle}
          onRefresh={handleRefresh}
          onExport={handleExport}
          showDeleted={showDeleted}
          toggleShowDeleted={toggleShowDeleted}
        />

        {/* Add Item button, hidden in deleted view */}
        {!showDeleted && (
          <Button
            onClick={() => {
              setAddModalOpen(true);
              setAddModalKey((k) => k + 1);
            }}
            leftSection={<Plus size={16} />}
          >
            Add Item
          </Button>
        )}
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
        onRestore={handleRestore}
        onRefresh={handleRefresh}
        onExport={handleExport}
        editedIds={editedIds}
        deletedIds={deletedIds}
        addedIds={addedIds}
        restoredIds={restoredIds}
        visibleFields={visibleFields}
        onFieldToggle={handleFieldToggle}
        deletedView={showDeleted}
        loading={loading}
      />
    </div>
  );
}
