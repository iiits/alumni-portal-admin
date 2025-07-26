"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { EventsAnalytics } from "./interface";
import Overview from "./Overview";

const Events: React.FC = () => {
  const { data, error, isLoading } = useQuery<EventsAnalytics>({
    queryKey: ["eventsAnalytics"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/events-analytics");
      console.log(response.data.data);
      return response.data.data;
    },
  });

  if (isLoading)
    return (
      <Searching
        message="Loading Events Analytics..."
        description="Please wait while we fetch the latest events analytics data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading Events Analytics"
        description={error.message}
        url="/events"
      />
    );
  if (!data)
    return (
      <NoData
        message="No Events Analytics Data Found"
        description="Please check back later."
        url="/events"
      />
    );

  return (
    <div className="space-y-8">
      <Overview events={data} />
    </div>
  );
};

export default Events;
