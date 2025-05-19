import { useState, useEffect } from "react";
import { Table, Group, Text, ScrollArea } from "@mantine/core";
import InventoryControls from "./InventoryControls";
import TableRow from "./TableRow";
import { FIELD_LABELS, getFields } from "../../utils/tableUtils";

// InventoryTable displays the inventory items in a table with sorting, field toggles, and inline editing.
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
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});

  // Update visibleFields when items change (e.g., after adding first item)
  useEffect(() => {
    setVisibleFields(getFields(items));
  }, [items]);

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
      <InventoryControls
        fields={fields}
        visibleFields={visibleFields}
        onFieldToggle={handleFieldToggle}
        onRefresh={onRefresh}
        onExport={onExport}
      />
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            {fields
              .filter((field) => visibleFields.includes(field))
              .map((field) => (
                <Table.Th
                  key={field}
                  onClick={() => handleSort(field)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {FIELD_LABELS[field] || field}
                  {sortField === field ? (sortAsc ? " ▲" : " ▼") : ""}
                </Table.Th>
              ))}
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {displayItems.map((item) => {
            const id = item.itemId || item.id || item._id || item.ID;
            return (
              <TableRow
                key={id}
                item={item}
                fields={fields}
                visibleFields={visibleFields}
                isEdited={editedIds.includes(id)}
                isDeleted={deletedIds.includes(id)}
                isAdded={addedIds.includes(id)}
                onEdit={onEdit}
                onDelete={onDelete}
                setEditRowId={setEditRowId}
                editRowId={editRowId}
                setEditRowData={setEditRowData}
                editRowData={editRowData}
              />
            );
          })}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
