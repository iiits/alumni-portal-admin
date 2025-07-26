import React from "react";

import SimpleStatsChart from "@/components/Commons/SimpleStatsChart";
import { TypeStats, WorkTypeStats } from "./interface";

interface StatsProps {
  typeStats: TypeStats;
  workTypeStats: WorkTypeStats;
}

const JOB_TYPES = ["fulltime", "parttime", "internship", "others"] as const;
const WORK_TYPES = ["onsite", "remote", "hybrid"] as const;

function transformTypeStats(typeStats: TypeStats) {
  return JOB_TYPES.map((type) => ({
    type,
    future: typeStats.future[type] || 0,
    past: typeStats.past[type] || 0,
    total: typeStats.total[type] || 0,
  }));
}

function transformWorkTypeStats(workTypeStats: WorkTypeStats) {
  return WORK_TYPES.map((workType) => ({
    workType,
    future: workTypeStats.future[workType] || 0,
    past: workTypeStats.past[workType] || 0,
    total: workTypeStats.total[workType] || 0,
  }));
}

const barKeys = [
  { key: "future", color: "#6366f1", label: "Future" },
  { key: "past", color: "#f87171", label: "Past" },
  { key: "total", color: "#4ade80", label: "Total" },
];

const Stats: React.FC<StatsProps> = ({ typeStats, workTypeStats }) => {
  const typeStatsArr = transformTypeStats(typeStats);
  const workTypeStatsArr = transformWorkTypeStats(workTypeStats);

  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Type Overview</h2>
      <div className="grid h-full w-full gap-4 grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
        <div className="row-span-1 lg:row-span-2 col-span-2 lg:col-span-1 rounded-lg shadow-sm p-4 max-md:h-[350px]">
          <SimpleStatsChart
            data={typeStatsArr}
            barKeys={barKeys}
            xKey="type"
            xLabel="Job Type"
            yLabel="Count"
            height={200}
          />
        </div>
        <div className="row-span-1 lg:row-span-2 col-span-2 lg:col-span-1 rounded-lg shadow-sm p-4 max-md:h-[350px]">
          <SimpleStatsChart
            data={workTypeStatsArr}
            barKeys={barKeys}
            xKey="workType"
            xLabel="Work Type"
            yLabel="Count"
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
