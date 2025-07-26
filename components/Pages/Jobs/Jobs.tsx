"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import JobList from "./JobList";
import { JobsAnalytics } from "./interface";
import Overview from "./Overview";
import Stats from "./Stats";
import TopJobs from "./TopJobs";

const Jobs: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuery<JobsAnalytics>({
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
      <Overview jobs={data} />
      <Stats typeStats={data.typeStats} workTypeStats={data.workTypeStats} />
      <TopJobs jobs={data} />
      <JobList mainRefetch={refetch} />
    </div>
  );
};

export default Jobs;
