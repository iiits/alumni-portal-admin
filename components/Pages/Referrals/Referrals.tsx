"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ReferralsAnalytics } from "./interface";
import Overview from "./Overview";
import TopReferrals from "./TopReferrals";

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
      <Overview referrals={data} />
      <TopReferrals referrals={data} />
    </div>
  );
};

export default Referrals;
