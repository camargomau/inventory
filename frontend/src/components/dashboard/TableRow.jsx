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
  isRestored,
  onEdit,
  onDelete,
  onRestore,
  setEditRowId,
  editRowId,
  setEditRowData,
  editRowData,
  actionsSticky,
  deletedView = false,
}) {
  // Get row id from item
  const id = item.itemId;
  // Is this row being edited?
  const isEditing = editRowId === id;
  // State for confirmation modal: { open: boolean, type: 'edit' | 'delete' | 'restore' | null }
  const [confirmModal, setConfirmModal] = useState({ open: false, type: null });

  // Row color logic for edited, deleted, added, or restored rows
  const getRowStyle = () => {
    if (isDeleted) return { background: "var(--mantine-color-red-1)", textDecoration: "line-through" };
    if (isRestored) return { background: "var(--mantine-color-orange-1" };
    if (isAdded) return { background: "var(--mantine-color-green-1)" };
    if (isEdited) return { background: "var(--mantine-color-indigo-1)" };
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
          background: "var(--mantine-primary-color-0)",
          boxShadow: "-1px 0 0 0 var(--mantine-primary-color-7)",
          color: "var(--mantine-primary-color-9)",
        }}
      >
        <Group gap="xs" wrap="nowrap">
          {/* Row action buttons (edit/delete/confirm/cancel) */}
          <TableRowActions
            isEditing={isEditing}
            isDeleted={isDeleted}
            deletedView={deletedView}
            onEditClick={() => {
              setEditRowId(id);
              setEditRowData(item);
            }}
            onDeleteClick={() => {
              onDelete(id);
              setConfirmModal({ open: false, type: null });
            }}
            onRestoreClick={() => {
              onRestore(id);
              setConfirmModal({ open: false, type: null });
            }}
            onConfirmEdit={() => {
              onEdit(id, editRowData);
              setEditRowId(null);
              setConfirmModal({ open: false, type: null });
            }}
            onCancelEdit={() => setEditRowId(null)}
            confirmModal={confirmModal}
            setConfirmModal={setConfirmModal}
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
