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

export default function AddItemModal({ opened, onClose, onAdd }) {
  const [tab, setTab] = useState("form");
  const [form, setForm] = useState({
    name: "",
    description: "",
    sku: "",
    price: 0,
    quantity: 0,
  });
  const [json, setJson] = useState("");
  const [error, setError] = useState("");

  const handleFormChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = () => {
    setError("");
    if (tab === "form") {
      if (!form.name || !form.sku || form.price <= 0 || form.quantity < 0) {
        setError("Please fill all required fields.");
        return;
      }
      onAdd(form);
      onClose();
      setForm({ name: "", description: "", sku: "", price: 0, quantity: 0 });
    } else {
      try {
        const obj = JSON.parse(json);
        onAdd(obj);
        onClose();
        setJson("");
      } catch {
        setError("Invalid JSON.");
      }
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add New Item" centered>
      <Tabs value={tab} onChange={setTab}>
        <Tabs.List>
          <Tabs.Tab value="form">Form</Tabs.Tab>
          <Tabs.Tab value="json">Paste JSON</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="form" pt="xs">
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
          <Textarea
            label="Paste JSON"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            minRows={6}
          />
        </Tabs.Panel>
      </Tabs>
      {error && (
        <Text color="red" size="sm" mt="sm">
          {error}
        </Text>
      )}
      <Group mt="md" justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add</Button>
      </Group>
    </Modal>
  );
}
