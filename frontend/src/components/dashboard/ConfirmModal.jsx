import { Modal, Button, Group, Text } from "@mantine/core";

// Modal for confirming actions (delete/edit)
export default function ConfirmModal({ opened, onClose, onConfirm, title, message, confirmColor = "red" }) {
  // Render confirmation modal with message and action buttons
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text mb="md">{message}</Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button color={confirmColor} onClick={onConfirm}>
          Confirm
        </Button>
      </Group>
    </Modal>
  );
}
