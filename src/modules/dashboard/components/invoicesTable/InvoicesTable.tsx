import { type FC, type ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const invoices = [
  {
    invoice: "INV001",
    client: "Acme Corp",
    email: "john.doe@example.com",
    paymentStatus: "Paid",
    bg: "bg-green-300",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    due: "2025-05-01",
  },
  {
    invoice: "INV002",
    client: "Globex Ltd",
    email: "sophia.williams@freelancehub.com",
    paymentStatus: "Pending",
    bg: "bg-yellow-200",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    due: "2025-05-10",
  },
  {
    invoice: "INV003",
    client: "Soylent Inc",
    email: "michael.smith@startupzone.io",
    paymentStatus: "Unpaid",
    bg: "bg-red-400",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    due: "2025-04-28",
  },
  {
    invoice: "INV004",
    client: "Initech",
    paymentStatus: "Paid",
    email: "emily.james@businessmail.org",
    bg: "bg-green-300",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    due: "2025-05-03",
  },
  {
    invoice: "INV005",
    client: "Umbrella Co",
    email: "david.lee@consultancypro.net",
    paymentStatus: "Paid",
    bg: "bg-green-300",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    due: "2025-04-30",
  },
];

export const InvoicesTable: FC = (): ReactElement => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Recent Invoices</h2>

      <div className="w-full overflow-x-auto rounded-lg border ">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] hidden md:table-cell">
                Invoice
              </TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Method</TableHead>
              <TableHead className="hidden md:table-cell">Due Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium hidden md:table-cell">
                  {invoice.invoice}
                </TableCell>
                <TableCell className="flex flex-col">
                  {invoice.client}
                  <span className="text-sm">{invoice.email}</span>
                </TableCell>
                <TableCell>
                  <Badge className={invoice.bg}>{invoice.paymentStatus}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {invoice.paymentMethod}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {invoice.due}
                </TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="hidden md:table-row-group">
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>

          {/* Mobile footer */}

          <TableFooter className="md:hidden table-row-group">
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
