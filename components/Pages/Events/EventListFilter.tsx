import { Button } from "@/components/ui/button";

import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { EventFilters } from "./interface";

interface EventFilterProps {
  filters: EventFilters;
  setFilters: (filters: EventFilters) => void;
  onFilterChange: () => void;
  isChanged: boolean;
}

export default function EventsFilter({
  filters,
  setFilters,
  onFilterChange,
  isChanged,
}: EventFilterProps) {
  const handleFilterChange = () => {
    onFilterChange();
  };

  const updateFilter = <K extends keyof EventFilters>(
    key: K,
    value: EventFilters[K],
  ) => {
    setFilters({ ...filters, [key]: value });
  };

  const typeOptions = [
    { id: "alumni", name: "Alumni" },
    { id: "club", name: "Club" },
    { id: "college", name: "College" },
    { id: "others", name: "Others" },
  ];

  return (
    <div className="mb-4 flex flex-wrap gap-4 items-end">
      <div className="w-auto">
        <MultiSelect
          options={typeOptions}
          selected={filters.type ? filters.type.split(",") : []}
          onChange={(selected) => updateFilter("type", selected.join(","))}
          placeholder="Select Types"
        />
      </div>
      <div className="w-auto">
        <MonthYearPicker
          label="Start"
          value={filters.startMonthYear}
          onChange={(val) => updateFilter("startMonthYear", val)}
        />
      </div>
      <div className="w-auto">
        <MonthYearPicker
          label="End"
          value={filters.endMonthYear}
          onChange={(val) => updateFilter("endMonthYear", val)}
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
