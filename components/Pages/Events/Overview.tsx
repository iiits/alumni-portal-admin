import React from "react";

import TimelineChart from "@/components/Commons/TimelineChart";

import { EventsAnalytics } from "./interface";

interface OverviewProps {
  events: EventsAnalytics;
}

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e42",
  "#ef4444",
  "#3b82f6",
  "#a21caf",
  "#eab308",
  "#14b8a6",
];

const Overview: React.FC<OverviewProps> = ({ events }) => {
  const allTypes = [
    "total",
    ...Array.from(
      new Set(events.timeseries.flatMap((t) => Object.keys(t.typeStats || {}))),
    ),
  ];

  const chartData = events.timeseries.map((entry) => {
    const typeFields = allTypes.reduce(
      (acc, type) => {
        if (type === "total") {
          acc["total"] = entry.total || 0;
        } else {
          acc[type] = entry.typeStats?.[type] || 0;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
    return {
      monthYear: entry.monthYear,
      ...typeFields,
    };
  });

  const lines = allTypes.map((type, idx) => ({
    key: type,
    color: COLORS[idx % COLORS.length],
    label:
      type === "total" ? "Total" : type.charAt(0).toUpperCase() + type.slice(1),
  }));

  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Events Overview</h2>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="w-full lg:w-1/4 flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-center md:items-end md:gap-3">
            <div className="font-bold text-6xl md:text-8xl">{events.total}</div>
            <div className="font-semibold text-base md:text-3xl mb-2 text-center">
              <span className="md:hidden block">Total Events</span>
              <div className="hidden md:block">
                <div>Total</div>
                <div>Events</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 grid grid-cols-3 gap-y-6 gap-x-4 justify-items-center">
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{events.past}</div>
            <div className="font-medium text-sm capitalize">Past</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{events.future}</div>
            <div className="font-medium text-sm capitalize">Upcoming</div>
          </div>
          {events.typeStats &&
            Object.entries(events.typeStats).map(([type, count]) => (
              <div
                key={type}
                className="flex flex-col items-center text-center capitalize"
              >
                <div className="font-bold text-4xl">{count}</div>
                <div className="font-medium text-sm">{type}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="rounded-lg shadow-sm p-4 min-h-fit h-[400px]">
        <div className="mb-2 font-semibold">Events Timeline</div>
        <TimelineChart
          data={chartData}
          lines={lines}
          xKey="monthYear"
          xLabel="Month-Year"
          yLabel="Events"
          height={250}
          showAxes={true}
          showBrush={true}
        />
      </div>
    </div>
  );
};

export default Overview;
