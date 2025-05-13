import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import ClientsPage from "@/modules/clients/pages/ClientsPage";
import InvoicesPage from "@/modules/invoices/pages/InvoicesPage";
import SettingsPage from "@/modules/settings/pages/SettingsPage";
import AuthPage from "@/modules/auth/pages/AuthPage";
import NotFound from "@/modules/notfound/pages/NotFound";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { LoadingSpinner } from "@/components/loading";

import { useAuth } from "@/hooks/useAuth";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return user ? children : <Navigate to="/auth" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <SidebarLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
