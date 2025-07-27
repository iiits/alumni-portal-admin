import MultiTopChart from "@/components/Commons/MultiTopChart";
import React from "react";
import { Jobs } from "./interface";

interface TopProps {
  jobs: Jobs;
}

const TopJobs: React.FC<TopProps> = ({ jobs }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Top Jobs</h2>

      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <MultiTopChart
          all={jobs.all.topCompanies}
          ongoing={jobs.ongoing.topCompanies}
          label="Top Companies"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <MultiTopChart
          all={jobs.all.topTitles}
          ongoing={jobs.ongoing.topTitles}
          label="Top Titles"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <MultiTopChart
          all={jobs.all.topLocations}
          ongoing={jobs.ongoing.topLocations}
          label="Top Locations"
        />
      </div>
    </div>
  );
};

export default TopJobs;
