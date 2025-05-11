import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import App from "./App";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Failed to find root element");

createRoot(rootEl).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster richColors />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
