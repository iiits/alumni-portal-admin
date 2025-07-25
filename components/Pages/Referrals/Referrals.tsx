"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ReferralsAnalytics } from "./interface";

const Referrals: React.FC = () => {
  const { data, error, isLoading } = useQuery<ReferralsAnalytics>({
    queryKey: ["referralsAnalytics"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/referrals-analytics");
      return response.data.data;
    },
  });

  if (isLoading)
    return (
      <Searching
        message="Loading Referrals Analytics..."
        description="Please wait while we fetch the latest referrals analytics data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading Referrals Analytics"
        description={error.message}
        url="/referrals"
      />
    );
  if (!data)
    return (
      <NoData
        message="No Referrals Analytics Data Found"
        description="Please check back later."
        url="/referrals"
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

export default Referrals;
