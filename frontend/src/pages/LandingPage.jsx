import { Paper } from "@mantine/core";
import { Package } from "lucide-react";
import AuthForm from "../components/authentication/AuthForm";

// Landing page: renders authentication form
export default function LandingPage({ setToken }) {
  // Render project description and AuthForm for login/register
  return (
    <div>
      <Paper
        p="md"
        radius="md"
        withBorder
        style={{
          maxWidth: 340,
          margin: "40px auto",
          backgroundColor: "var(--mantine-color-gray-1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Package size={36} />
          <h1 style={{ textAlign: "center", marginTop: 0, marginBottom: 0 }}>Inventory</h1>
        </div>
        <p style={{ textAlign: "center", marginBottom: 0 }}>
          This web application allows you to manage a store or business inventory.
        </p>
        <p style={{ textAlign: "center", marginBottom: 0 }}>
          Add, consult, update, and delete products in real time. Export inventory data as PDF reports.
        </p>
      </Paper>
      <AuthForm setToken={setToken} />
    </div>
  );
}
