import React from "react";

import TopChart from "@/components/Commons/Top";
import { JobsAnalytics } from "./interface";

interface TopProps {
  jobs: JobsAnalytics;
}

const TopJobs: React.FC<TopProps> = ({ jobs }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Top Jobs</h2>

      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <TopChart
          data={jobs.topCompanies}
          barKey="count"
          nameKey="name"
          color="#6366f1"
          label="Top Companies"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <TopChart
          data={jobs.topRoles}
          barKey="count"
          nameKey="name"
          color="#6366f1"
          label="Top Roles"
        />
      </div>
      <div className="md:h-[400px] lg:h-[500px] xl:h-[600px]">
        <TopChart
          data={jobs.topPosters}
          barKey="count"
          nameKey="name"
          color="#6366f1"
          label="Top Job Posters"
        />
      </div>
    </div>
  );
};

export default TopJobs;
