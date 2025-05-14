import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { type FC } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Invoice = {
  id: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  paidDate?: string | null;
};

interface SectionCardsProps {
  invoices: Invoice[];
}

type CardMetric = {
  title: string;
  amount: string;
  trend: "up" | "down";
  trendPercent: string;
  highlight: string;
  description: string;
};

const cardMetrics: CardMetric[] = [
  {
    title: "Total Revenue",
    amount: "$12,500.00",
    trend: "up",
    trendPercent: "+12.5%",
    highlight: "Revenue increasing steadily",
    description: "Based on paid invoices this month",
  },
  {
    title: "Paid Invoices",
    amount: "32",
    trend: "up",
    trendPercent: "+8.3%",
    highlight: "Collection rate improving",
    description: "Paid invoices are up compared to last month",
  },
  {
    title: "Pending Invoices",
    amount: "14",
    trend: "down",
    trendPercent: "-5.2%",
    highlight: "Payments awaiting action",
    description: "Follow up with clients to reduce delays",
  },
  {
    title: "Overdue Invoices",
    amount: "5",
    trend: "down",
    trendPercent: "-2.1%",
    highlight: "Attention needed on overdue invoices",
    description: "Consider sending reminders or penalties",
  },
];

export const SectionCards: FC<SectionCardsProps> = ({ invoices }) => {
  const totalRevenue = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pending = invoices.filter((inv) => inv.status === "pending").length;
  const paid = invoices.filter((inv) => inv.status === "paid").length;
  const overdue = invoices.filter((inv) => inv.status === "overdue").length;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardMetrics.map((metric) => (
        <Card key={metric.title} className="@container/card">
          <CardHeader>
            <CardDescription>{metric.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {metric.amount}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {metric.trend === "up" ? (
                  <IconTrendingUp />
                ) : (
                  <IconTrendingDown />
                )}
                {metric.trendPercent}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {metric.highlight}{" "}
              {metric.trend === "up" ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">{metric.description}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
