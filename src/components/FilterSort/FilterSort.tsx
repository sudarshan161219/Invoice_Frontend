import {
  useState,
  useEffect,
  useMemo,
  type FC,
  type ReactElement,
} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import type { FilterSortProps } from "@/types/filterSortOptions";

export const FilterSort: FC<FilterSortProps> = ({
  sortOptions,
  onSortChange,
  selectedSort,
}): ReactElement => {
  const currentLabel =
    sortOptions.find((opt) => opt.value === selectedSort)?.label || "Sort";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-sm">
          {currentLabel}
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
