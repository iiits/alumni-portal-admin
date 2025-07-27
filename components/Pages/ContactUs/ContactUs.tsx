"use client";

import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ContactUsList from "./ContactUsList";
import { ContactUsAnalytics } from "./interface";
import Overview from "./Overview";
import Timeline from "./Timeline";

const ContactUs: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuery<ContactUsAnalytics>({
    queryKey: ["contactUsAnalytics"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/contacts-analytics");
      return response.data.data;
    },
  });

  if (isLoading)
    return (
      <Searching
        message="Loading Contact Us Analytics..."
        description="Please wait while we fetch the latest contact us analytics data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading Contact Us Analytics"
        description={error.message}
        url="/contactus"
      />
    );
  if (!data)
    return (
      <NoData
        message="No Contact Us Analytics Data Found"
        description="Please check back later."
        url="/contactus"
      />
    );

  return (
    <div className="space-y-8">
      <Overview contacts={data} />
      <Timeline contacts={data} />
      <ContactUsList mainRefetch={refetch} />
    </div>
  );
};

export default ContactUs;
