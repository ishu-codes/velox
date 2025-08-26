import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StompSessionProvider } from "react-stomp-hooks";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StompSessionProvider
        url={import.meta.env.VITE_URL ?? "ws://localhost:8080/ws"}
        onConnect={(frame) => {
          console.log("STOMP Connected!", frame);
        }}
        onStompError={(frame) => {
          console.error("STOMP error:", frame);
        }}
      >
        <App />
        <Toaster />
      </StompSessionProvider>
    </ThemeProvider>
  </StrictMode>
);
