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
        primaryShade: 8,
        defaultRadius: "md",
        fontFamily: "Inter, sans-serif",
        white: "#f8f8f8",
        components: {
          Table: {
            styles: (theme) => ({
              thead: {
                backgroundColor: theme.colors.gray[3],
              },
              tbody: {
                backgroundColor: theme.colors.gray[1],
              },
            }),
          },
        },
      }}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
