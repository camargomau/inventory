import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Group,
  Stack,
} from "@mantine/core";
import { login, register } from "../api/auth"; // Import API functions

export default function AuthForm({ setToken }) {
  // "login" or "register"
  // Show login form by default
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple client-side validation for register
  // These constraints are set in the backend as well
  // see backend/src/main/java/com/camargomau/inventory/dto/RegisterRequest.java
  const validateRegister = () => {
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
  const handleSubmit = async (e) => {
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

  // Render authentication form
  return (
    <Paper p="md" radius="md" withBorder style={{ maxWidth: 340, margin: "40px auto" }}>
      {/* Title based on mode */}
      <Title order={2} mb="md">
        {mode === "login"
          ? "Login"
          : "Register"}
      </Title>

      {/* Auth form */}
      <form onSubmit={handleSubmit}>
        <Stack>
          {/* Show username input only in register mode */}
          {mode === "register" && (
            <TextInput
              label="Username"
              placeholder="bilbobaggins"
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
            placeholder="bilbo@theshire.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />

          {/* Password input */}
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={mode === "register" ? 6 : undefined}
            maxLength={mode === "register" ? 64 : undefined}
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

      {/* Toggle between login and register modes */}
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
            ? "Not registered yet?"
            : "Already have an account?"}
        </Button>
      </Group>
    </Paper>
  );
}
