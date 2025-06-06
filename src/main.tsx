import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import App from "./App";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { CollapseProvider } from "./context/CollapseProvider";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Failed to find root element");

createRoot(rootEl).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CollapseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Toaster richColors />
        </CollapseProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
