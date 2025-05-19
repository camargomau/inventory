import { useState } from "react";
import { Button, Paper, Title, Text, Stack, TextInput, PasswordInput, Group } from "@mantine/core";
import { useToken } from "../../context/TokenContext";
import { login, register } from "../../api/auth";

// Simple client-side validation for register
// These constraints are set in the backend as well
// see backend/src/main/java/com/camargomau/inventory/dto/RegisterRequest.java
function validateRegister(username, password, setError) {
  if (username.length < 3 || username.length > 32) {
    setError("Username must be 3-32 characters.");
    return false;
  }
  if (password.length < 6 || password.length > 64) {
    setError("Password must be 6-64 characters.");
    return false;
  }
  return true;
};

// Function for handling form submission
async function handleSubmit(e, username, email, password, mode, setError, setLoading, setToken) {
  // Prevent default non-React form submission
  e.preventDefault();
  // Clear any previous messages
  setError("");

  // Validate register fields if in register mode
  if (mode === "register" && !validateRegister()) return;
  setLoading(true);

  try {
    // Use API functions from api/auth.js
    const data =
      mode === "login"
        ? await login(email, password)
        : await register(username, email, password);
    // Store JWT token in localStorage
    localStorage.setItem("token", data.token);
    // Update parent state to trigger redirect to Dashboard in App.jsx
    setToken(data.token);
  } catch (err) {
    // Show error message from API or fallback
    setError(
      err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Authentication failed"
    );
  } finally {
    setLoading(false);
  }
};

export default function AuthForm() {
  const { setToken } = useToken();

  // User info
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Form info
  // Mode: login or register
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Paper
      p="md"
      radius="md"
      withBorder
      style={{
        maxWidth: 340,
        margin: "40px auto",
        backgroundColor: "var(--mantine-color-gray-1)"
      }}
    >
      {/* Title (based on mode) */}
      <Title order={2} mb="md">
        {mode === "login" ? "Log In" : "Register"}
      </Title>

      {/* Input form */}
      <form onSubmit={(e) => handleSubmit(e, username, email, password, mode, setError, setLoading, setToken)}>
        <Stack>
          {/* Username input (only for register mode) */}
          {mode === "register" && (
              <TextInput
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={32}
              />
          )}

          {/* Email input */}
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />

          {/* Password input */}
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={mode === "register" ? 6 : undefined}
            maxLength={mode === "register" ? 64 : undefined}
          />

          {/* Show error message (if present) */}
          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}

          {/* Submit button */}
          <Button type="submit" fullWidth loading={loading}>
            {mode === "login" ? "Log In" : "Register"}
          </Button>
        </Stack>
      </form>

      {/* Login/register toggle button */}
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
    </Paper>
  );
}
