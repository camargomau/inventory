import { ActionIcon, Tooltip } from "@mantine/core";
import { Pencil, Trash2, Check, X } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

// Edit/delete/confirm/cancel actions for a row
export default function TableRowActions({
  isEditing,
  isDeleted,
  onEditClick,
  onDeleteClick,
  onConfirmEdit,
  onCancelEdit,
  confirmEditOpen,
  setConfirmEditOpen,
  confirmDeleteOpen,
  setConfirmDeleteOpen,
}) {
  return isEditing ? (
    <>
      <Tooltip label="Confirm">
        <ActionIcon color="green" variant="light" onClick={() => setConfirmEditOpen(true)}>
          <Check size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Cancel">
        <ActionIcon color="gray" variant="light" onClick={onCancelEdit}>
          <X size={16} />
        </ActionIcon>
      </Tooltip>
      <ConfirmModal
        opened={confirmEditOpen}
        onClose={() => setConfirmEditOpen(false)}
        onConfirm={onConfirmEdit}
        title="Confirm edit"
        message="Are you sure you want to save these changes?"
        confirmColor="blue"
      />
    </>
  ) : (
    <>
      <Tooltip label="Edit">
        <ActionIcon color="blue" variant="light" onClick={onEditClick} disabled={isDeleted}>
          <Pencil size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Delete">
        <ActionIcon color="red" variant="light" onClick={() => setConfirmDeleteOpen(true)} disabled={isDeleted}>
          <Trash2 size={16} />
        </ActionIcon>
      </Tooltip>
      <ConfirmModal
        opened={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={onDeleteClick}
        title="Confirm delete"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
}
