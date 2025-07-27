import { Button } from "@/components/ui/button";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { ReferralFilters } from "./interface";

interface ReferralFilterProps {
  filters: ReferralFilters;
  setFilters: (filters: ReferralFilters) => void;
  onFilterChange: () => void;
  isChanged: boolean;
}

export default function ReferralsFilter({
  filters,
  setFilters,
  onFilterChange,
  isChanged,
}: ReferralFilterProps) {
  const handleFilterChange = () => {
    onFilterChange();
  };

  const updateFilter = <K extends keyof ReferralFilters>(
    key: K,
    value: ReferralFilters[K],
  ) => {
    setFilters({ ...filters, [key]: value });
  };

  const dateFieldOptions = [
    { id: "postedOn", name: "Posted On" },
    { id: "lastApplyDate", name: "Last Apply Date" },
  ];

  const hasActiveFilters = Boolean(
    filters.startMonthYear ||
      filters.endMonthYear ||
      filters.search ||
      (filters.dateField && filters.dateField !== "postedOn") ||
      filters.minReferrals ||
      filters.maxReferrals,
  );

  const handleClearFilters = () => {
    setFilters({
      page: "1",
      limit: "10",
      search: "",
      startMonthYear: "",
      endMonthYear: "",
      dateField: "postedOn",
      minReferrals: "",
      maxReferrals: "",
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
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
      <div className="w-auto">
        <input
          type="number"
          className="border rounded px-2 py-1"
          placeholder="Min Referrals"
          value={filters.minReferrals || ""}
          onChange={(e) => updateFilter("minReferrals", e.target.value)}
          min={0}
        />
      </div>
      <div className="w-auto">
        <input
          type="number"
          className="border rounded px-2 py-1"
          placeholder="Max Referrals"
          value={filters.maxReferrals || ""}
          onChange={(e) => updateFilter("maxReferrals", e.target.value)}
          min={0}
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
