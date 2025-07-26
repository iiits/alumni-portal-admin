"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BatchDepartment from "./BatchDepartment";
import { UserAnalytics } from "./interface";
import Overview from "./Overview";
import UserList from "./UserList";

const Users: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuery<UserAnalytics>({
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

  const { overview, byBatch, byDepartment, unverified } = data;

  return (
    <div className="space-y-8">
      <Overview users={overview} unverified={unverified} />
      <BatchDepartment byBatch={byBatch} byDepartment={byDepartment} />
      <UserList mainRefetch={refetch} />
    </div>
  );
};

export default Users;
