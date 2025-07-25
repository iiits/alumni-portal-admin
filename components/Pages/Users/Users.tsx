"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { UserAnalytics } from "./interface";

const Users: React.FC = () => {
  const { data, error, isLoading } = useQuery<UserAnalytics>({
    queryKey: ["userAnalytics"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/users-analytics");
      return response.data.data;
    },
  });

  if (isLoading)
    return (
      <Searching
        message="Loading User Analytics..."
        description="Please wait while we fetch the latest user analytics data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading User Analytics"
        description={error.message}
        url="/users"
      />
    );
  if (!data)
    return (
      <NoData
        message="No User Analytics Data Found"
        description="Please check back later."
        url="/users"
      />
    );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...new Array(4)].map((i, idx) => (
          <div
            key={"referrals-card-" + idx}
            className="h-24 p-4 rounded-lg bg-gray-100 dark:bg-neutral-800 shadow-sm"
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...new Array(6)].map((i, idx) => (
          <div
            key={"referrals-chart-" + idx}
            className="h-[300px] rounded-lg bg-gray-100 dark:bg-neutral-800 shadow-sm p-4"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Users;
