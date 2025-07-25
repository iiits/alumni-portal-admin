"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { JobsAnalytics } from "./interface";

const Jobs: React.FC = () => {
  const { data, error, isLoading } = useQuery<JobsAnalytics>({
    queryKey: ["jobsAnalytics"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/jobs-analytics");
      return response.data.data;
    },
  });

  if (isLoading)
    return (
      <Searching
        message="Loading Jobs Analytics..."
        description="Please wait while we fetch the latest jobs analytics data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading Jobs Analytics"
        description={error.message}
        url="/jobs"
      />
    );
  if (!data)
    return (
      <NoData
        message="No Jobs Analytics Data Found"
        description="Please check back later."
        url="/jobs"
      />
    );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...new Array(4)].map((i, idx) => (
          <div
            key={"jobs-card-" + idx}
            className="h-24 p-4 rounded-lg bg-gray-100 dark:bg-neutral-800 shadow-sm"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...new Array(6)].map((i, idx) => (
          <div
            key={"jobs-chart-" + idx}
            className="h-[300px] rounded-lg bg-gray-100 dark:bg-neutral-800 shadow-sm p-4"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
