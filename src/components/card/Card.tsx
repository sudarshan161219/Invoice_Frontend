import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface CardProps {
  title: string;
  amount: string;
  growth?: string;
  description?: string;
  className?: string;
  trend?: string;
  icon?: ReactNode;
}

export const Card = ({
  title,
  amount,
  growth,
  trend,
  description,
  className,
}: CardProps) => {
  const textColor = trend === "up" ? "text-green-400" : "text-red-400";
  return (
    <div
      className={cn(
        "bg-[var(--card)] border border-border rounded-2xl shadow-sm p-4 space-y-2",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--primary)]">{title}</h3>
        {/* {icon && <div className="text-muted-foreground">{icon}</div>} */}

        {growth && (
          <div className="px-1 py-0.5  rounded-md border shadow-sm ">
            <p
              className={`text-xs flex gap-1.5 items-center  ${textColor} font-medium`}
            >
              {trend === "up" ? (
                <TrendingUp size={13} />
              ) : (
                <TrendingDown size={13} />
              )}
              {growth}
            </p>
          </div>
        )}
      </div>

      <p className="text-2xl font-bold text-foreground">{amount}</p>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
