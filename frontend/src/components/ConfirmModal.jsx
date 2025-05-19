import { Modal, Button, Group, Text } from "@mantine/core";

export default function ConfirmModal({ opened, onClose, onConfirm, title, message, confirmColor = "red" }) {
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
