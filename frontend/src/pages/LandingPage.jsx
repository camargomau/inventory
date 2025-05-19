import { Paper } from "@mantine/core";
import AuthForm from "../components/AuthForm";

// Landing page: renders authentication form
export default function LandingPage() {
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
        <h2 style={{ textAlign: "center", marginTop: 0 }}>Inventory Management</h2>
        <p style={{ textAlign: "center", marginBottom: 0 }}>
          This web application allows you to manage a store or business inventory.
        </p>
        <p style={{ textAlign: "center", marginBottom: 0 }}>
          Add, consult, update, and delete products in real time. Export inventory data as PDF reports.
        </p>
      </Paper>
      <AuthForm />
    </div>
  );
}
