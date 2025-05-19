import { Modal, Button, Group, Text } from "@mantine/core";

export default function ConfirmModal({ opened, onClose, onConfirm, title, message }) {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <Text mb="md">{message}</Text>
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Confirm
        </Button>
      </Group>
    </Modal>
  );
}
