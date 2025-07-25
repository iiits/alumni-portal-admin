"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AlumniAnalytics } from "./interface";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...new Array(4)].map((i, idx) => (
          <div
            key={"alumni-card-" + idx}
            className="h-24 p-4 rounded-lg bg-gray-100 dark:bg-neutral-800 shadow-sm"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...new Array(6)].map((i, idx) => (
          <div
            key={"alumni-chart-" + idx}
            className="h-[300px] rounded-lg bg-gray-100 dark:bg-neutral-800 shadow-sm p-4"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Alumni;
