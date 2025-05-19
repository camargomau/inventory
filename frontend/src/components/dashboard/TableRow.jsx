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
  // Get row id from item
  const id = item.itemId || item.id || item._id || item.ID;
  // Is this row being edited?
  const isEditing = editRowId === id;
  // State for confirmation modals
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // Row color logic for edited, deleted, or added rows
  const getRowStyle = () => {
    if (isDeleted) return { background: "#ffeaea", textDecoration: "line-through" };
    if (isAdded) return { background: "#eaffea" };
    if (isEdited) return { background: "#eaf0ff" };
    return {};
  };

  // Render table row with cells and actions
  return (
    <Table.Tr key={id} style={getRowStyle()}>
      {/* Render each cell for visible fields */}
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
      {/* Actions cell with sticky position */}
      <Table.Td
        style={{
          position: "sticky",
          right: 0,
          background: "#fff",
          zIndex: 1,
          boxShadow: "-2px 0 4px -2px rgba(0,0,0,0.05)",
        }}
      >
        <Group gap="xs" wrap="nowrap">
          {/* Row action buttons (edit/delete/confirm/cancel) */}
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
