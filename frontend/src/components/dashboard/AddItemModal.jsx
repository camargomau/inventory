import { useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  NumberInput,
  Textarea,
  Group,
  Stack,
  Text,
  Tabs,
} from "@mantine/core";

// Modal for adding a new inventory item (form or JSON)
export default function AddItemModal({ opened, onClose, onAdd, error }) {
  // State for tab selection (form/json)
  const [tab, setTab] = useState("form");
  // State for form fields
  const [form, setForm] = useState({
    name: "",
    description: "",
    sku: "",
    price: 0,
    quantity: 0,
  });
  // State for JSON input
  const [json, setJson] = useState("");
  // Local error state
  const [localError, setLocalError] = useState("");

  // Handle changes in form fields
  const handleFormChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  // Handle submit for both form and JSON modes
  const handleSubmit = () => {
    setLocalError("");
    if (tab === "form") {
      if (!form.name || !form.sku || form.price <= 0 || form.quantity < 0) {
        setLocalError("Please fill all required fields.");
        return;
      }
      onAdd(form);
    } else {
      try {
        const obj = JSON.parse(json);
        onAdd(obj);
      } catch {
        setLocalError("Invalid JSON.");
      }
    }
  };

  // Render modal with form and JSON tabs
  return (
    <Modal opened={opened} onClose={onClose} title="Add New Item" centered>
      {/* Tabs for switching between form and JSON input */}
      <Tabs value={tab} onChange={setTab}>
        <Tabs.List>
          <Tabs.Tab value="form">Form</Tabs.Tab>
          <Tabs.Tab value="json">Paste JSON</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="form" pt="xs">
          {/* Form fields for item details */}
          <Stack>
            <TextInput
              label="Name"
              value={form.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              required
            />
            <TextInput
              label="SKU"
              value={form.sku}
              onChange={(e) => handleFormChange("sku", e.target.value)}
              required
            />
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
            />
            <NumberInput
              label="Price"
              value={form.price}
              onChange={(v) => handleFormChange("price", v || 0)}
              min={0}
              precision={2}
              required
            />
            <NumberInput
              label="Quantity"
              value={form.quantity}
              onChange={(v) => handleFormChange("quantity", v || 0)}
              min={0}
              required
            />
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="json" pt="xs">
          {/* JSON input for bulk add */}
          <Textarea
            label="Paste JSON"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            minRows={10}
            autosize
          />
        </Tabs.Panel>
      </Tabs>
      {/* Show error message if present */}
      {(localError || error) && (
        <Text color="red" size="sm" mt="sm">
          {localError || error}
        </Text>
      )}
      {/* Action buttons */}
      <Group mt="md" justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add</Button>
      </Group>
    </Modal>
  );
}
