// components/ClientPage.tsx
import type { FC, ReactElement } from "react";
import { useState } from "react";
import { FilterSort } from "@/components/FilterSort/FilterSort";
import { Tabs } from "../components/Tabs/Tabs";
import { SearchInput } from "@/components/searchInput/SearchInput";
import type { SortOption } from "@/types/sortOptions";

const sortOptions: SortOption[] = [
  { label: "A → Z", value: "name-asc" },
  { label: "Z → A", value: "name-desc" },
  { label: "Newest", value: "date-desc" },
  { label: "Oldest", value: "date-asc" },
];

export const ClientsPage: FC = (): ReactElement => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  const handleSearch = (value: string) => {
    console.log("Searching clients for:", value);
    // Make API call or filter data here
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // trigger sorting logic here
    console.log("Sort by:", value);
  };

  return (
    <div className="space-y-6">
      <div className="w-full flex flex-row justify-between">
        <Tabs />
        <SearchInput
          placeholder="Search client"
          onDebouncedChange={handleSearch}
        />
        <FilterSort
          sortOptions={sortOptions}
          selectedSort={sortBy}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
};
