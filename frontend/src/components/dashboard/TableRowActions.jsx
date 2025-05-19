import { ActionIcon, Tooltip } from "@mantine/core";
import { Pencil, Trash2, Check, X, RotateCcw } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

// Edit/delete/confirm/cancel/restore actions for a row
export default function TableRowActions({
  isEditing,
  isDeleted,
  deletedView = false,
  onEditClick,
  onDeleteClick,
  onRestoreClick,
  onConfirmEdit,
  onCancelEdit,
  confirmModal,
  setConfirmModal,
}) {
  if (deletedView) {
    return (
      <>
        {/* Restore button */}
        <Tooltip label="Restore">
          <ActionIcon color="blue" variant="light" onClick={() => setConfirmModal({ open: true, type: 'restore' })}>
            <RotateCcw size={16} />
          </ActionIcon>
        </Tooltip>
        {/* Confirm restore modal */}
        <ConfirmModal
          opened={confirmModal.open && confirmModal.type === 'restore'}
          onClose={() => setConfirmModal({ open: false, type: null })}
          onConfirm={onRestoreClick}
          title="Restore item"
          message="Are you sure you want to restore this item?"
          confirmColor="orange"
        />
      </>
    );
  }
  // Render action icons for editing, deleting, confirming, and canceling
  return isEditing ? (
    <>
      {/* Confirm edit button */}
      <Tooltip label="Confirm">
        <ActionIcon color="green" variant="light" onClick={() => setConfirmModal({ open: true, type: 'edit' })}>
          <Check size={16} />
        </ActionIcon>
      </Tooltip>
      {/* Cancel edit button */}
      <Tooltip label="Cancel">
        <ActionIcon color="gray" variant="light" onClick={onCancelEdit}>
          <X size={16} />
        </ActionIcon>
      </Tooltip>
      {/* Confirm edit modal */}
      <ConfirmModal
        opened={confirmModal.open && confirmModal.type === 'edit'}
        onClose={() => setConfirmModal({ open: false, type: null })}
        onConfirm={onConfirmEdit}
        title="Confirm edit"
        message="Are you sure you want to save these changes?"
        confirmColor="blue"
      />
    </>
  ) : (
    <>
      {/* Edit button */}
      <Tooltip label="Edit">
        <ActionIcon color="blue" variant="light" onClick={onEditClick} disabled={isDeleted}>
          <Pencil size={16} />
        </ActionIcon>
      </Tooltip>
      {/* Delete button */}
      <Tooltip label="Delete">
        <ActionIcon color="red" variant="light" onClick={() => setConfirmModal({ open: true, type: 'delete' })} disabled={isDeleted}>
          <Trash2 size={16} />
        </ActionIcon>
      </Tooltip>
      {/* Confirm delete modal */}
      <ConfirmModal
        opened={confirmModal.open && confirmModal.type === 'delete'}
        onClose={() => setConfirmModal({ open: false, type: null })}
        onConfirm={onDeleteClick}
        title="Confirm delete"
        message="Are you sure you want to delete this item?"
      />
    </>
  );
}
