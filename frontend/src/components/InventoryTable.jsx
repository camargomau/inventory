import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Group,
  ActionIcon,
  Checkbox,
  TextInput,
  Tooltip,
  ScrollArea,
  Menu,
  Text,
} from "@mantine/core";
import {
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Check,
  X,
  RefreshCw,
  FileDown,
} from "lucide-react";
import ConfirmModal from "./ConfirmModal";

function getFields(items) {
  if (!items || items.length === 0) return [];
  return Object.keys(items[0]);
}

export default function InventoryTable({
  items,
  onEdit,
  onDelete,
  onRefresh,
  onExport,
  editedIds = [],
  deletedIds = [],
  addedIds = [],
}) {
  // Always recalculate fields when items change
  const fields = getFields(items);
  const [visibleFields, setVisibleFields] = useState(fields);

  // Update visibleFields when items change (e.g., after adding first item)
  useEffect(() => {
    setVisibleFields(getFields(items));
  }, [items]);

  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmEditId, setConfirmEditId] = useState(null);

  // Field visibility toggle
  const handleFieldToggle = (field) => {
    setVisibleFields((fields) =>
      fields.includes(field)
        ? fields.filter((f) => f !== field)
        : [...fields, field]
    );
  };

  // Sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc((asc) => !asc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Prepare sorted and filtered items
  let displayItems = [...items];
  if (sortField) {
    displayItems.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  // Row color logic
  const getRowStyle = (id) => {
    if (deletedIds.includes(id)) return { background: "#ffeaea", textDecoration: "line-through" };
    if (addedIds.includes(id)) return { background: "#eaffea" };
    if (editedIds.includes(id)) return { background: "#eaf0ff" };
    return {};
  };

  // If no items, show a message and no table/buttons
  if (items.length === 0) {
    return (
      <Group position="center" mt="md">
        <Text color="dimmed">No items in inventory yet.</Text>
      </Group>
    );
  }

  return (
    <ScrollArea>
      <Group mb="sm">
        {/* Field visibility toggles */}
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button variant="outline" size="xs" leftSection={<Eye size={16} />}>
              Fields
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {getFields(items).map((field) => (
              <Menu.Item
                key={field}
                leftSection={
                  visibleFields.includes(field) ? <Eye size={16} /> : <EyeOff size={16} />
                }
              >
                <Checkbox
                  label={field}
                  checked={visibleFields.includes(field)}
                  onChange={() => handleFieldToggle(field)}
                  size="xs"
                />
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <Button
          variant="outline"
          size="xs"
          leftSection={<RefreshCw size={16} />}
          onClick={onRefresh}
        >
          Refresh
        </Button>
        <Button
          variant="outline"
          size="xs"
          leftSection={<FileDown size={16} />}
          onClick={onExport}
        >
          Export PDF
        </Button>
      </Group>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            {getFields(items)
              .filter((field) => visibleFields.includes(field))
              .map((field) => (
                <Table.Th
                  key={field}
                  onClick={() => handleSort(field)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {field}
                  {sortField === field ? (sortAsc ? " ▲" : " ▼") : ""}
                </Table.Th>
              ))}
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {displayItems.map((item) => {
            const id = item.itemId || item.id || item._id || item.ID;
            const isEditing = editRowId === id;
            return (
              <Table.Tr key={id} style={getRowStyle(id)}>
                {getFields(items)
                  .filter((field) => visibleFields.includes(field))
                  .map((field) => (
                    <Table.Td key={field}>
                      {isEditing && !["id", "ID", "_id", "itemId", "createdAt", "sku"].includes(field) ? (
                        <TextInput
                          value={editRowData[field]}
                          onChange={(e) =>
                            setEditRowData((data) => ({
                              ...data,
                              [field]: e.target.value,
                            }))
                          }
                          size="xs"
                        />
                      ) : (
                        <Text
                          span
                          style={
                            deletedIds.includes(id)
                              ? { textDecoration: "line-through", color: "#c00" }
                              : {}
                          }
                        >
                          {item[field]}
                        </Text>
                      )}
                    </Table.Td>
                  ))}
                <Table.Td>
                  <Group gap="xs" wrap="nowrap">
                    {isEditing ? (
                      <>
                        <Tooltip label="Confirm">
                          <ActionIcon
                            color="green"
                            variant="light"
                            onClick={() => setConfirmEditId(id)}
                          >
                            <Check size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Cancel">
                          <ActionIcon
                            color="gray"
                            variant="light"
                            onClick={() => setEditRowId(null)}
                          >
                            <X size={16} />
                          </ActionIcon>
                        </Tooltip>
                        {/* Confirm edit modal */}
                        <ConfirmModal
                          opened={confirmEditId === id}
                          onClose={() => setConfirmEditId(null)}
                          onConfirm={() => {
                            onEdit(id, editRowData);
                            setEditRowId(null);
                            setConfirmEditId(null);
                          }}
                          title="Confirm edit"
                          message="Are you sure you want to save these changes?"
                          confirmColor="blue"
                        />
                      </>
                    ) : (
                      <>
                        <Tooltip label="Edit">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => {
                              setEditRowId(id);
                              setEditRowData(item);
                            }}
                            disabled={deletedIds.includes(id)}
                          >
                            <Pencil size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete">
                          <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => setConfirmDeleteId(id)}
                            disabled={deletedIds.includes(id)}
                          >
                            <Trash2 size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
      <ConfirmModal
        opened={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          onDelete(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        title="Confirm delete"
        message="Are you sure you want to delete this item?"
      />
    </ScrollArea>
  );
}
