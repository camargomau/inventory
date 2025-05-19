import { Button, Group, Menu, Checkbox, Flex } from "@mantine/core";
import { Eye, EyeOff, RefreshCw, FileDown, Trash2, Package } from "lucide-react";
import { FIELD_LABELS } from "../../utils/tableUtils";

// Controls for toggling fields, refreshing, exporting
export default function InventoryControls({
  fields,
  visibleFields,
  onFieldToggle,
  onRefresh,
  onExport,
  showDeleted = false,
  toggleShowDeleted = () => {},
}) {
  // Render controls for field visibility, refresh, export, and view toggle
  return (
    <Group>
      {/* Refresh button */}
      <Button
        variant="outline"
        size="xs"
        leftSection={<RefreshCw size={16} />}
        onClick={onRefresh}
      >
        Refresh
      </Button>

      {/* Field visibility menu */}
      <Menu shadow="md" width={200} closeOnItemClick={false}>
        <Menu.Target>
          <Button variant="outline" size="xs" leftSection={<Eye size={16} />}>
            Show/Hide Fields
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {fields.map((field) => (
            <Menu.Item
              key={field}
              leftSection={
                visibleFields.includes(field) ? <Eye size={16} /> : <EyeOff size={16} />
              }
            >
              <Checkbox
                label={FIELD_LABELS[field] || field}
                checked={visibleFields.includes(field)}
                onChange={() => onFieldToggle(field)}
                size="xs"
              />
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      {/* Export button */}
      <Button
        variant="outline"
        size="xs"
        leftSection={<FileDown size={16} />}
        onClick={onExport}
      >
        Export to PDF
      </Button>

      {/* Toggle between normal and deleted view */}
      <Button
        variant={showDeleted ? "outline" : "outline"}
        color={showDeleted ? "orange" : "gray"}
        size="xs"
        leftSection={showDeleted ? <Package size={16} /> : <Trash2 size={16} />}
        onClick={toggleShowDeleted}
      >
        {showDeleted ? "Show Active" : "Show Deleted"}
      </Button>
    </Group>
  );
}
