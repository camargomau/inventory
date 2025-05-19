import { useState } from "react";
import { Table, Group } from "@mantine/core";
import TableCell from "./TableCell";
import TableRowActions from "./TableRowActions";

// Renders a single inventory row, including actions
export default function TableRow({
  item,
  fields,
  visibleFields,
  isEdited,
  isDeleted,
  isAdded,
  onEdit,
  onDelete,
  setEditRowId,
  editRowId,
  setEditRowData,
  editRowData,
}) {
  const id = item.itemId || item.id || item._id || item.ID;
  const isEditing = editRowId === id;
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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
            <TableCell
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
          <TableRowActions
            isEditing={isEditing}
            isDeleted={isDeleted}
            onEditClick={() => {
              setEditRowId(id);
              setEditRowData(item);
            }}
            onDeleteClick={() => {
              onDelete(id);
              setConfirmDeleteOpen(false);
            }}
            onConfirmEdit={() => {
              onEdit(id, editRowData);
              setEditRowId(null);
              setConfirmEditOpen(false);
            }}
            onCancelEdit={() => setEditRowId(null)}
            confirmEditOpen={confirmEditOpen}
            setConfirmEditOpen={setConfirmEditOpen}
            confirmDeleteOpen={confirmDeleteOpen}
            setConfirmDeleteOpen={setConfirmDeleteOpen}
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
