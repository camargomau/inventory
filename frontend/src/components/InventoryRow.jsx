import { useState } from "react";
import {
  Table,
  Group,
  ActionIcon,
  Tooltip,
  TextInput,
  NumberInput,
  Text,
} from "@mantine/core";
import { Pencil, Trash2, Check, X } from "lucide-react";
import ConfirmModal from "./ConfirmModal";
import { formatDate } from "../utils/tableUtils";
import InventoryCell from "./InventoryCell";

export default function InventoryRow({
  item,
  fields,
  visibleFields,
  isEdited,
  isDeleted,
  isAdded,
  onEdit,
  onDelete,
  editedIds,
  deletedIds,
  setEditRowId,
  editRowId,
  setEditRowData,
  editRowData,
}) {
  const id = item.itemId || item.id || item._id || item.ID;
  const isEditing = editRowId === id;
  const [confirmEditId, setConfirmEditId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Row color logic
  const getRowStyle = () => {
    if (isDeleted) return { background: "#ffeaea", textDecoration: "line-through" };
    if (isAdded) return { background: "#eaffea" };
    if (isEdited) return { background: "#eaf0ff" };
    return {};
  };

  return (
    <Table.Tr key={id} style={getRowStyle()}>
      {fields
        .filter((field) => visibleFields.includes(field))
        .map((field) => (
          <Table.Td key={field}>
            <InventoryCell
              field={field}
              value={item[field]}
              isEditing={isEditing}
              editRowData={editRowData}
              setEditRowData={setEditRowData}
              isDeleted={isDeleted}
            />
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
                  disabled={isDeleted}
                >
                  <Pencil size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => setConfirmDeleteId(id)}
                  disabled={isDeleted}
                >
                  <Trash2 size={16} />
                </ActionIcon>
              </Tooltip>
              <ConfirmModal
                opened={confirmDeleteId === id}
                onClose={() => setConfirmDeleteId(null)}
                onConfirm={() => {
                  onDelete(id);
                  setConfirmDeleteId(null);
                }}
                title="Confirm delete"
                message="Are you sure you want to delete this item?"
              />
            </>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
