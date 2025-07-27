import TimelineChart from "@/components/Commons/TimelineChart";
import React from "react";
import { ContactUsAnalytics } from "./interface";

interface TimelineProps {
  contacts: ContactUsAnalytics;
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

const Timeline: React.FC<TimelineProps> = ({ contacts }) => {
  const lines = [
    { key: "count", color: COLORS[0], label: "Total" },
    { key: "resolved", color: COLORS[1], label: "Resolved" },
    { key: "unresolved", color: COLORS[2], label: "Unresolved" },
  ];

  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Queries Timeline</h2>

      <TimelineChart
        data={contacts.timeseries}
        lines={lines}
        showBrush={true}
        xKey="date"
        xLabel="Date"
        yLabel="Count"
      />
    </div>
  );
};

export default Timeline;
