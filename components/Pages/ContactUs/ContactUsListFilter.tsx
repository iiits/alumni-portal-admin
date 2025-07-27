import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";

import React from "react";
import { ContactUsFilters } from "./interface";

interface EContactUsFilterProps {
  filters: ContactUsFilters;
  setFilters: (filters: ContactUsFilters) => void;
  onFilterChange: () => void;
  isChanged: boolean;
}

export default function ContactUsFilter({
  filters,
  setFilters,
  onFilterChange,
  isChanged,
}: EContactUsFilterProps) {
  const [startOpen, setStartOpen] = React.useState(false);
  const [endOpen, setEndOpen] = React.useState(false);

  const handleFilterChange = () => {
    onFilterChange();
  };

  const updateFilter = <K extends keyof ContactUsFilters>(
    key: K,
    value: ContactUsFilters[K],
  ) => {
    setFilters({ ...filters, [key]: value });
  };

  const resolvedOptions = [
    { id: "true", name: "Resolved" },
    { id: "false", name: "Unresolved" },
  ];

  const hasActiveFilters = Boolean(
    filters.resolved || filters.startDate || filters.endDate,
  );

  const handleClearFilters = () => {
    setFilters({
      page: "1",
      limit: "10",
      startDate: "",
      endDate: "",
      resolved: "",
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="w-auto flex flex-col gap-3">
        <Popover open={startOpen} onOpenChange={setStartOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="start-date"
              className="w-40 justify-between font-normal"
            >
              {filters.startDate
                ? new Date(filters.startDate).toLocaleDateString()
                : "Start date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Label htmlFor="start-date" className="px-2 py-1 block">
              Start
            </Label>
            <Calendar
              mode="single"
              selected={
                filters.startDate ? new Date(filters.startDate) : undefined
              }
              captionLayout="dropdown"
              onSelect={(date) => {
                updateFilter(
                  "startDate",
                  date
                    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                    : "",
                );
                setStartOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-auto flex flex-col gap-3">
        <Popover open={endOpen} onOpenChange={setEndOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="end-date"
              className="w-40 justify-between font-normal"
            >
              {filters.endDate
                ? new Date(filters.endDate).toLocaleDateString()
                : "End date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Label htmlFor="end-date" className="px-2 py-1 block">
              End
            </Label>
            <Calendar
              mode="single"
              selected={filters.endDate ? new Date(filters.endDate) : undefined}
              captionLayout="dropdown"
              onSelect={(date) => {
                updateFilter(
                  "endDate",
                  date
                    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                    : "",
                );
                setEndOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-auto">
        <Select
          value={
            filters.resolved === undefined || filters.resolved === ""
              ? "all"
              : String(filters.resolved)
          }
          onValueChange={(v) => updateFilter("resolved", v === "all" ? "" : v)}
        >
          <SelectTrigger className="w-auto min-w-[140px]">
            <SelectValue placeholder="Resolved Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {resolvedOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
