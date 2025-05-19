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
  if (isEditing && !["id", "ID", "_id", "itemId", "createdAt", "sku"].includes(field)) {
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
        style={{ minWidth: 90, width: 90 }}
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
        style={{ minWidth: 180 }}
      />
    );
  }
  if (field === "createdAt") {
    return (
      <Text
        span
        style={isDeleted ? { textDecoration: "line-through", color: "#c00" } : {}}
      >
        {formatDate(value)}
      </Text>
    );
  }
  return (
    <Text
      span
      style={isDeleted ? { textDecoration: "line-through", color: "#c00" } : {}}
    >
      {value}
    </Text>
  );
}
