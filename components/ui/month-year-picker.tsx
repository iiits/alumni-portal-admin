"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function MonthYearPicker({
  label,
  value,
  onChange,
  minYear = 2014,
  maxYear = new Date().getFullYear() + 5,
}: {
  label?: string;
  value?: string; // "Jan-2024"
  onChange: (val: string) => void;
  minYear?: number;
  maxYear?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState<number | null>(null);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (value) {
      const [m, y] = value.split("-");
      setSelectedMonth(months.findIndex((mon) => mon === m));
      setSelectedYear(Number(y));
    }
  }, [value]);

  const handleSelect = (monthIdx: number, year: number) => {
    setSelectedMonth(monthIdx);
    setSelectedYear(year);
    onChange(`${months[monthIdx]}-${year}`);
    setOpen(false);
  };

  // Generate years in reverse order (newest first)
  const years = React.useMemo(() => {
    const arr = [];
    for (let y = maxYear; y >= minYear; y--) arr.push(y);
    return arr;
  }, [minYear, maxYear]);

  return (
    <div className="flex flex-col gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-48 justify-between font-normal"
          >
            {label ? `${label}: ` : ""}
            {selectedMonth !== null && selectedYear
              ? `${months[selectedMonth]}-${selectedYear}`
              : "Select Month-Year"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          {label && (
            <div className="mb-2 text-sm font-medium text-gray-700">
              {label}
            </div>
          )}
          <div className="flex gap-3 items-center mb-3 w-full">
            <select
              className="border rounded px-2 py-1 flex-1 min-w-0"
              value={selectedMonth ?? ""}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              <option value="" disabled>
                Month
              </option>
              {months.map((m, idx) => (
                <option key={m} value={idx}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className="border rounded px-2 py-1 flex-1 min-w-0"
              value={selectedYear ?? ""}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <Button
            size="sm"
            className="w-full"
            onClick={() => {
              if (selectedMonth !== null && selectedYear) {
                handleSelect(selectedMonth, selectedYear);
              }
            }}
            disabled={selectedMonth === null || !selectedYear}
          >
            OK
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
