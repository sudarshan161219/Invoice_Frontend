import { Routes, Route, Navigate } from "react-router-dom";
import {
  AuthPage,
  DashboardPage,
  ClientsPage,
  InvoicesPage,
  SettingsPage,
  CreateInvoice,
  CreateClient,
  PaymentsPage,
  NotFound,
} from "@/modules/export.ts";

import { LoadingSpinner } from "@/components/loading";
import { Sidebar } from "@/layout/Sidebar";

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
            <Sidebar />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="invoices" element={<InvoicesPage />} />
        <Route path="invoices/new" element={<CreateInvoice />} />
        <Route path="clients/new" element={<CreateClient />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
