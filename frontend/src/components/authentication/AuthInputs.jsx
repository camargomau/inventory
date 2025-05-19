import { TextInput, PasswordInput } from "@mantine/core";

// Show username input only in register mode
// Email and password inputs are always shown
export function AuthInputs({
  mode,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) {
  return (
    <>
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
    </>
  );
}
