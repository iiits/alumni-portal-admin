import SimpleStatsChart from "@/components/Commons/SimpleStatsChart";
import React from "react";
import { Jobs } from "./interface";

interface TopProps {
  jobs: Jobs;
}

const EMPLOYMENT_TYPES = [
  "full-time",
  "part-time",
  "freelancer",
  "intern",
  "entrepreneur",
] as const;
const JOB_TYPES = ["on-site", "remote", "hybrid"] as const;

function transformEmploymentType(
  all: Record<string, number>,
  ongoing: Record<string, number>,
) {
  return EMPLOYMENT_TYPES.map((type) => ({
    type,
    all: all[type] || 0,
    ongoing: ongoing[type] || 0,
  }));
}

function transformJobType(
  all: Record<string, number>,
  ongoing: Record<string, number>,
) {
  return JOB_TYPES.map((type) => ({
    type,
    all: all[type] || 0,
    ongoing: ongoing[type] || 0,
  }));
}

const barKeys = [
  { key: "all", color: "#6366f1", label: "All" },
  { key: "ongoing", color: "#f59e42", label: "Ongoing" },
];

const JobType: React.FC<TopProps> = ({ jobs }) => {
  const employmentTypeData = transformEmploymentType(
    jobs.all.byEmploymentType,
    jobs.ongoing.byEmploymentType,
  );
  const jobTypeData = transformJobType(
    jobs.all.byJobType,
    jobs.ongoing.byJobType,
  );

  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Job Type Overview</h2>
      <div className="grid h-full w-full gap-4 grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
        <div className="row-span-1 lg:row-span-2 col-span-2 lg:col-span-1 rounded-lg shadow-sm p-4 max-md:h-[350px]">
          <SimpleStatsChart
            data={employmentTypeData}
            barKeys={barKeys}
            xKey="type"
            xLabel="Employment Type"
            yLabel="Count"
            height={250}
          />
        </div>
        <div className="row-span-1 lg:row-span-2 col-span-2 lg:col-span-1 rounded-lg shadow-sm p-4 max-md:h-[350px]">
          <SimpleStatsChart
            data={jobTypeData}
            barKeys={barKeys}
            xKey="type"
            xLabel="Job Type"
            yLabel="Count"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default JobType;
