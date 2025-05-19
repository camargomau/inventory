import { Button, Paper, Title, Text, Stack } from "@mantine/core";
import { AuthInputs } from "./AuthInputs";
import { AuthToggle } from "./AuthToggle";
import { useAuthForm } from "../hooks/useAuthForm";

export default function AuthForm({ setToken }) {
  // Use custom hook for authentication form logic
  const {
    mode,
    setMode,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    error,
    setError,
    loading,
    handleSubmit,
  } = useAuthForm(setToken);

  // Render authentication form
  return (
    <Paper p="md" radius="md" withBorder style={{ maxWidth: 340, margin: "40px auto" }}>
      {/* Title based on mode */}
      <Title order={2} mb="md">
        {mode === "login" ? "Login" : "Register"}
      </Title>

      {/* Auth form */}
      <form onSubmit={handleSubmit}>
        <Stack>
          <AuthInputs
            mode={mode}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          {/* Show error message if present */}
          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}

          {/* Submit button */}
          <Button type="submit" fullWidth loading={loading}>
            {mode === "login" ? "Login" : "Register"}
          </Button>
        </Stack>
      </form>

      <AuthToggle mode={mode} setMode={setMode} setError={setError} />
    </Paper>
  );
}
