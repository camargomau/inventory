import { Button, Group, Menu, Checkbox } from "@mantine/core";
import { Eye, EyeOff, RefreshCw, FileDown } from "lucide-react";
import { FIELD_LABELS } from "../../utils/tableUtils";

// Controls for toggling fields, refreshing, and exporting
export default function InventoryControls({
  fields,
  visibleFields,
  onFieldToggle,
  onRefresh,
  onExport,
}) {
  // Render controls for field visibility, refresh, and export
  return (
    <Group mb="sm">
      {/* Field visibility menu */}
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="outline" size="xs" leftSection={<Eye size={16} />}>
            Fields
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
      {/* Refresh button */}
      <Button
        variant="outline"
        size="xs"
        leftSection={<RefreshCw size={16} />}
        onClick={onRefresh}
      >
        Refresh
      </Button>
      {/* Export button */}
      <Button
        variant="outline"
        size="xs"
        leftSection={<FileDown size={16} />}
        onClick={onExport}
      >
        Export PDF
      </Button>
    </Group>
  );
}
