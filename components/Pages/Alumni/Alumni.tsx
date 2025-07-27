"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BatchDepartment from "./BatchDepartment";
import { AlumniAnalytics } from "./interface";
import JobType from "./JobType";
import TopEducation from "./TopEducation";
import TopJobs from "./TopJobs";
import TopLocations from "./TopLocations";

const Alumni: React.FC = () => {
  const { data, error, isLoading } = useQuery<AlumniAnalytics>({
    queryKey: ["alumniAnalytics"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/alumni-analytics");
      return response.data.data;
    },
  });

  if (isLoading)
    return (
      <Searching
        message="Loading Alumni Analytics..."
        description="Please wait while we fetch the latest alumni analytics data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading Alumni Analytics"
        description={error.message}
        url="/alumni"
      />
    );
  if (!data)
    return (
      <NoData
        message="No Alumni Analytics Data Found"
        description="Please check back later."
        url="/alumni"
      />
    );

  return (
    <div className="space-y-8">
      <BatchDepartment byBatch={data.batches} byDepartment={data.departments} />
      <JobType jobs={data.jobs} />
      <TopJobs jobs={data.jobs} />
      <TopEducation education={data.education} />
      <TopLocations locations={data.locations} />
    </div>
  );
};

export default Alumni;
