import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MultiSelect } from "@/components/ui/multi-select";
import { UserFilters } from "./interface";

interface UserFilterProps {
  filters: UserFilters;
  setFilters: (filters: UserFilters) => void;
  onFilterChange: () => void;
  isChanged: boolean;
}

export default function UsersFilter({
  filters,
  setFilters,
  onFilterChange,
  isChanged,
}: UserFilterProps) {
  const handleFilterChange = () => {
    onFilterChange();
  };

  const updateFilter = <K extends keyof UserFilters>(
    key: K,
    value: UserFilters[K],
  ) => {
    setFilters({ ...filters, [key]: value });
  };

  const currentYear = new Date().getFullYear();
  const years = [...Array(currentYear + 5 - 2014 + 1)].map((_, i) =>
    (currentYear + 5 - i).toString(),
  );

  const batchOptions = years.map((year) => ({
    id: year,
    name: year,
  }));

  const departmentOptions = [
    { id: "CSE", name: "CSE" },
    { id: "ECE", name: "ECE" },
    { id: "AIDS", name: "AIDS" },
  ];

  const roleOptions = [
    { id: "admin", name: "Admin" },
    { id: "user", name: "User" },
    { id: "alumni", name: "Alumni" },
  ];

  const verifiedOptions = [
    { id: "true", name: "Verified" },
    { id: "false", name: "Unverified" },
  ];

  return (
    <div className="mb-4 flex flex-wrap gap-4 items-end">
      <div className="w-auto">
        <Select
          value={
            filters.verified === undefined || filters.verified === ""
              ? "all"
              : String(filters.verified)
          }
          onValueChange={(v) => updateFilter("verified", v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-auto min-w-[140px]">
            <SelectValue placeholder="Verified Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {verifiedOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-auto">
        <MultiSelect
          options={batchOptions}
          selected={filters.batch ? filters.batch.split(",") : []}
          onChange={(selected) => updateFilter("batch", selected.join(","))}
          placeholder="Select Batches"
        />
      </div>

      <div className="w-auto">
        <MultiSelect
          options={departmentOptions}
          selected={filters.department ? filters.department.split(",") : []}
          onChange={(selected) =>
            updateFilter("department", selected.join(","))
          }
          placeholder="Select Departments"
        />
      </div>

      <div className="w-auto">
        <MultiSelect
          options={roleOptions}
          selected={filters.role ? filters.role.split(",") : []}
          onChange={(selected) => updateFilter("role", selected.join(","))}
          placeholder="Select Roles"
        />
      </div>

      <div className="w-auto">
        <Button
          onClick={handleFilterChange}
          disabled={!isChanged}
          className="w-auto min-w-[120px]"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
