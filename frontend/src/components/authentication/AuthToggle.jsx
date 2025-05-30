import { Button, Group } from "@mantine/core";

// Toggle between login and register modes
export function AuthToggle({ mode, setMode, setError }) {
  return (
    <Group position="center" mt="md">
      <Button
        variant="subtle"
        size="xs"
        onClick={() => {
          setError("");
          setMode(mode === "login" ? "register" : "login");
        }}
      >
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
      </Button>
    </Group>
  );
}
