import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import '@fontsource/inter/index.css';
import '@mantine/core/styles.css';
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        primaryColor: "cyan",
        defaultRadius: "md",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
