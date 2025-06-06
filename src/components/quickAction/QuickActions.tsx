// src/components/dashboard/QuickActions.tsx
import type { FC, ReactElement } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { Button } from "@/components/button/Button";
import { Plus } from "lucide-react";

export const QuickActions: FC = (): ReactElement | null => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname !== "/") return null;

  const handleCreateInvoice = () => navigate("/invoices/new");
  const handleAddClient = () => navigate("/clients/new");

  return (
    <div className="flex flex-col sm:flex-row justify-end gap-2">
      <Button
        variant="default"
        type="button"
        size="smMd"
        className="flex text-sm"
        onClick={handleCreateInvoice}
      >
        <Link className="flex items-center gap-1" to="/invoices/new">
          <Plus size={17} />
          New Invoice
        </Link>
      </Button>
      <Button
        variant="outline"
        type="button"
        size="smMd"
        className="flex text-sm"
        onClick={handleAddClient}
      >
        <Link className="flex items-center gap-1" to="/clients/new">
          <Plus size={17} />
          Add Client
        </Link>
      </Button>
    </div>
  );
};

//   <Button
//     isLoading={loading}
//     type="submit"
//     loadingText="Please wait..."
//     variant="outline"
//     size="md"
//   >
//     Sign In
//   </Button>
