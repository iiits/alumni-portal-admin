import React from "react";

import { JobsAnalytics } from "./interface";

interface OverviewProps {
  jobs: JobsAnalytics;
}

const Overview: React.FC<OverviewProps> = ({ jobs }) => {
  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Jobs Overview</h2>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="w-full lg:w-1/4 flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-center md:items-end md:gap-3">
            <div className="font-bold text-6xl md:text-8xl">{jobs.total}</div>
            <div className="font-semibold text-base md:text-3xl mb-2 text-center">
              <span className="md:hidden block">Total Jobs</span>
              <div className="hidden md:block">
                <div>Total</div>
                <div>Jobs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 justify-items-center">
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{jobs.past}</div>
            <div className="font-medium text-sm capitalize">Past</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{jobs.future}</div>
            <div className="font-medium text-sm capitalize">Upcoming</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{jobs.uniqueCompanies}</div>
            <div className="font-medium text-sm capitalize">
              Unique Companies
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="font-bold text-4xl">{jobs.uniqueRoles}</div>
            <div className="font-medium text-sm capitalize">Unique Roles</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
