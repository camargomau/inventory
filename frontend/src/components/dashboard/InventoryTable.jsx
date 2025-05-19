import { useState, useEffect } from "react";
import { Table, Group, Text, ScrollArea } from "@mantine/core";
import TableRow from "./TableRow";
import { FIELD_LABELS, getFields } from "../../utils/tableUtils";

// InventoryTable displays the inventory items in a table with sorting, field toggles, and inline editing
export default function InventoryTable({
  items,
  onEdit,
  onDelete,
  onRestore,
  onRefresh,
  onExport,
  editedIds = [],
  deletedIds = [],
  addedIds = [],
  visibleFields,
  onFieldToggle,
  deletedView = false,
}) {
  // Always recalculate fields when items change
  const fields = getFields(items);
  // State for sorting
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  // State for editing rows
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});

  // Sorting handler
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

  // Render inventory table with controls and rows
  return (
    <ScrollArea>
      <Table striped highlightOnHover withTableBorder style={{ minWidth: 700 }}>
        <Table.Thead>
          <Table.Tr>
            {/* Render table headers for visible fields */}
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
            {/* Actions header with sticky position */}
            <Table.Th
              style={{
                position: "sticky",
                right: 0,
                background: "var(--mantine-primary-color-1)",
                zIndex: 2,
                boxShadow: "-1px 0 0 var(--mantine-primary-color-7)",
                color: "var(--mantine-primary-color-9)",
              }}
            >
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {/* Render each inventory row */}
          {displayItems.map((item) => {
            const id = item.itemId;
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
                onRestore={onRestore}
                setEditRowId={setEditRowId}
                editRowId={editRowId}
                setEditRowData={setEditRowData}
                editRowData={editRowData}
                actionsSticky={true}
                deletedView={deletedView}
              />
            );
          })}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
