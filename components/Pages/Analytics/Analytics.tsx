"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Events from "./Events";
import { DashboardAnalytics } from "./interface";
import JobsReferrals from "./JobsReferrals";
import Logins from "./Logins";
import Users from "./Users";

const Analytics: React.FC = () => {
  const { data, error, isLoading } = useQuery<DashboardAnalytics>({
    queryKey: ["dashboardAnalytics"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/dashboard");
      return response.data.data;
    },
  });

  if (isLoading)
    return (
      <Searching
        message="Loading Analytics..."
        description="Please wait while we fetch the latest analytics data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading Analytics"
        description={error.message}
        url="/analytics"
      />
    );
  if (!data)
    return (
      <NoData
        message="No Analytics Data Found"
        description="Please check back later."
        url="/analytics"
      />
    );

  const { users, events, jobs, referrals, logins } = data;

  return (
    <div className="space-y-8">
      <Users users={users} />
      <Logins logins={logins} />
      <Events events={events} />
      <JobsReferrals jobs={jobs} referrals={referrals} />
    </div>
  );
};

export default Analytics;
