import { Center, Loader, Group, Button, Title } from "@mantine/core";
import InventoryTable from "../components/dashboard/InventoryTable";
import AddItemModal from "../components/dashboard/AddItemModal";
import { useInventory } from "../hooks/useInventory";

export default function Dashboard({ token, setToken }) {
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
