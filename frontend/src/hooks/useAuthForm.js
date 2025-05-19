import { useState } from "react";
import { login, register } from "../api/auth";

// Handles authentication form logic, including validation
export function useAuthForm(setToken) {
  // "login" or "register"; controls which form is shown
  // Show login by default
  const [mode, setMode] = useState("login");
  // Stores the user's email input
  const [email, setEmail] = useState("");
  // Stores the user's password input
  const [password, setPassword] = useState("");
  // Stores the user's username input (register only)
  const [username, setUsername] = useState("");
  // Stores error messages to display to the user
  const [error, setError] = useState("");
 // Indicates if a request is in progress (for loading spinners, etc.)
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

  return {
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
  };
}
