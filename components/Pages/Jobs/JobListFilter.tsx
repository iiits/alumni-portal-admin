import { Button } from "@/components/ui/button";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { JobFilters } from "./interface";

interface JobFilterProps {
  filters: JobFilters;
  setFilters: (filters: JobFilters) => void;
  onFilterChange: () => void;
  isChanged: boolean;
}

export default function JobsFilter({
  filters,
  setFilters,
  onFilterChange,
  isChanged,
}: JobFilterProps) {
  const handleFilterChange = () => {
    onFilterChange();
  };

  const updateFilter = <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K],
  ) => {
    setFilters({ ...filters, [key]: value });
  };

  const typeOptions = [
    { id: "fulltime", name: "Full Time" },
    { id: "parttime", name: "Part Time" },
    { id: "internship", name: "Internship" },
    { id: "others", name: "Others" },
  ];

  const workTypeOptions = [
    { id: "remote", name: "Remote" },
    { id: "onsite", name: "Onsite" },
    { id: "hybrid", name: "Hybrid" },
  ];

  const dateFieldOptions = [
    { id: "postedOn", name: "Posted On" },
    { id: "lastApplyDate", name: "Last Apply Date" },
  ];

  const hasActiveFilters = Boolean(
    filters.type ||
      filters.workType ||
      filters.startMonthYear ||
      filters.endMonthYear ||
      filters.search ||
      (filters.dateField && filters.dateField !== "postedOn"),
  );

  const handleClearFilters = () => {
    setFilters({
      page: "1",
      limit: "10",
      search: "",
      startMonthYear: "",
      endMonthYear: "",
      type: "",
      workType: "",
      dateField: "postedOn",
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="w-auto">
        <MultiSelect
          options={typeOptions}
          selected={filters.type ? filters.type.split(",") : []}
          onChange={(selected) => updateFilter("type", selected.join(","))}
          placeholder="Select Types"
        />
      </div>
      <div className="w-auto">
        <MultiSelect
          options={workTypeOptions}
          selected={filters.workType ? filters.workType.split(",") : []}
          onChange={(selected) => updateFilter("workType", selected.join(","))}
          placeholder="Select Work Types"
        />
      </div>
      <div className="w-auto">
        <select
          className="border rounded px-2 py-1"
          value={filters.dateField || "postedOn"}
          onChange={(e) => updateFilter("dateField", e.target.value)}
        >
          {dateFieldOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
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
      <div className="w-auto flex gap-2">
        <Button
          onClick={handleFilterChange}
          disabled={!isChanged}
          className="w-auto min-w-[120px]"
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
          className="w-auto min-w-[120px]"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
