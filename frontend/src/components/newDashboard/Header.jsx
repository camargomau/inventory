import { Button, Flex, Group, Title } from "@mantine/core";
import { Plus, User, LogOut } from "lucide-react";
import useInventory from "../../context/InventoryContext";

export default function Header() {
  const {
    username,
    setToken,
    showDeleted,
    addModalKey,
    addModalOpen,
    handleAdd,
    addError
  } = useInventory();

  return (
    <div style={{ padding: "20px 24px" }}>
      {/* Header with title, username, and sign out button */}
      <Group justify="space-between" mb="md">
        <Title order={2}>Inventory</Title>
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
        { /* <InventoryControls
          fields={items.length > 0 ? Object.keys(items[0]) : []}
          visibleFields={visibleFields}
          onFieldToggle={handleFieldToggle}
          onRefresh={handleRefresh}
          onExport={handleExport}
          showDeleted={showDeleted}
          toggleShowDeleted={toggleShowDeleted}
        /> */ }

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
      {/* <AddItemModal
        key={addModalKey}
        opened={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setAddError("");
          setAddModalKey((k) => k + 1);
        }}
        onAdd={handleAdd}
        error={addError}
      /> */ }
    </div>
  );
}
