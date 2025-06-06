import { type FC, type ReactElement } from "react";
import { InvoiceForm } from "../components/export.ts";

export const CreateInvoice: FC = (): ReactElement => {
  return (
    <div className="min-h-screen">
      <InvoiceForm />
    </div>
  );
};
