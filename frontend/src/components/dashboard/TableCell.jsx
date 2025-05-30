import { TextInput, NumberInput, Text } from "@mantine/core";
import { formatDate } from "../../utils/tableUtils";

// Renders a single cell, handling edit/view and type
export default function TableCell({
  field,
  value,
  isEditing,
  editRowData,
  setEditRowData,
  isDeleted,
}) {
  // Render editable input for editable fields
  if (isEditing && !["itemId", "createdAt", "sku"].includes(field)) {
    return typeof editRowData[field] === "number" ? (
      <NumberInput
        value={editRowData[field]}
        onChange={(v) =>
          setEditRowData((data) => ({
            ...data,
            [field]: v ?? 0,
          }))
        }
        size="xs"
        hideControls={false}
        min={0}
        style={{ minWidth: 90, width: 90, whiteSpace: "nowrap" }}
      />
    ) : (
      <TextInput
        value={editRowData[field]}
        onChange={(e) =>
          setEditRowData((data) => ({
            ...data,
            [field]: e.target.value,
          }))
        }
        size="xs"
        style={{ minWidth: 180, whiteSpace: "nowrap" }}
      />
    );
  }
  // Render formatted date for createdAt field
  if (field === "createdAt") {
    return (
      <Text
        span
        style={{ whiteSpace: "nowrap", ...(isDeleted ? { textDecoration: "line-through", color: "var(--mantine-color-red-6)" } : {}) }}
      >
        {formatDate(value)}
      </Text>
    );
  }
  // Render value as text (with strikethrough if deleted)
  return (
    <Text
      span
      style={{ whiteSpace: "nowrap", ...(isDeleted ? { textDecoration: "line-through", color: "var(--mantine-color-red-6)" } : {}) }}
    >
      {value}
    </Text>
  );
}
