import { type FC, type ReactElement } from "react";
import { SectionCards } from "@/components/section-cards";
import { InvoicesTable } from "../components/invoicesTable/InvoicesTable";
import { InvoiceStatusPieChart } from "../components/invoiceStatusPieChart/InvoiceStatusPieChart";
import { RevenueChart } from "../components/revenueChart/RevenueChart";


export const DashboardPage: FC = (): ReactElement => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards invoices={[]} />
        </div>
        <InvoicesTable />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-7">
          <InvoiceStatusPieChart />
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};

