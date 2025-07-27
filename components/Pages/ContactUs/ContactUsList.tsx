import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { ContactUs, ContactUsFilters } from "./interface";

import DataList from "@/components/Commons/DataList";
import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { EyeIcon } from "lucide-react";
import ContactUsFilter from "./ContactUsListFilter";
import ContactUsModal from "./EditContactUsModal";

interface ListProps {
  mainRefetch: () => void;
}

const ContactUsList: React.FC<ListProps> = ({ mainRefetch }) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [appliedFilters, setAppliedFilters] = useState<ContactUsFilters>({
    page: "1",
    limit: "10",
    search: "",
    startDate: "",
    endDate: "",
    resolved: "",
  });

  const [currentFilters, setCurrentFilters] = useState<ContactUsFilters>({
    page: "1",
    limit: "10",
    search: "",
    startDate: "",
    endDate: "",
    resolved: "",
  });

  interface ContactUsListProps {
    contactForms: ContactUs[];
    pagination: {
      currentPage: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
  }

  const { data, error, isLoading, refetch } = useQuery<ContactUsListProps>({
    queryKey: ["contactUsList", appliedFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (appliedFilters.page) params.append("page", appliedFilters.page);
      if (appliedFilters.limit) params.append("limit", appliedFilters.limit);
      if (appliedFilters.search) params.append("search", appliedFilters.search);
      if (appliedFilters.startDate)
        params.append("startDate", appliedFilters.startDate);
      if (appliedFilters.endDate)
        params.append("endDate", appliedFilters.endDate);
      if (appliedFilters.resolved)
        params.append("resolved", appliedFilters.resolved);

      const response = await axiosInstance.get("/contactus", { params });
      return response.data?.data;
    },
  });

  const fetchAllContactUsData = async () => {
    const params = new URLSearchParams();
    params.append("page", "1");
    params.append("limit", data?.pagination.total.toString() || "1000");
    const response = await axiosInstance.get("/contactus", { params });
    return response.data?.data.contactForms;
  };

  if (isLoading)
    return (
      <Searching
        message="Loading Queery List..."
        description="Please wait while we fetch the latest query list data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading QueryList"
        description={error.message}
        url="/contactus"
      />
    );
  if (!data)
    return (
      <NoData
        message="No QueryList Found"
        description="Please check back later."
        url="/contactus"
      />
    );

  const handlePageChange = (page: number) => {
    setCurrentFilters((prev) => ({ ...prev, page: String(page) }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setAppliedFilters((prev) => ({ ...prev, page: String(page) }));
      refetch();
    }, 1000);
  };

  const handlePerPageChange = (perPage: number) => {
    setCurrentFilters((prev) => ({ ...prev, limit: String(perPage) }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setAppliedFilters((prev) => ({ ...prev, limit: String(perPage) }));
      refetch();
    }, 1000);
  };

  const pagination = {
    total: data.pagination.total,
    totalPages: data.pagination.totalPages,
    currentPage: data.pagination.currentPage,
    perPage: data.pagination.perPage,
    onPageChange: handlePageChange,
    onPerPageChange: handlePerPageChange,
  };

  const handleFilterChange = () => {
    setAppliedFilters(currentFilters);
  };

  const isFilterChanged =
    JSON.stringify(appliedFilters) !== JSON.stringify(currentFilters);

  const handleSearchChange = (text: string) => {
    setCurrentFilters((prev) => ({
      ...prev,
      search: text,
      page: "1",
    }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setAppliedFilters((prev) => ({
        ...prev,
        search: text,
        page: "1",
      }));
      refetch();
    }, 600);
  };

  const showColumns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "subject",
      header: "Subject",
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }: { row: { original: ContactUs } }) => {
        const msg = row.original.message;
        return <span>{msg.length > 40 ? msg.slice(0, 40) + "..." : msg}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }: { row: { original: ContactUs } }) => {
        const date = new Date(row.original.createdAt);
        return (
          <span>
            {date.toLocaleDateString()} - {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      accessorKey: "resolved",
      header: "Resolved",
      cell: ({ row }: { row: { original: ContactUs } }) => (
        <span>{row.original.resolved ? "Yes" : "No"}</span>
      ),
    },
    {
      accessorKey: "resolutionMessage",
      header: "Resolution Message",
      cell: ({ row }: { row: { original: ContactUs } }) => {
        const msg = row.original.resolutionMessage;
        return (
          <span>
            {msg ? (msg.length > 40 ? msg.slice(0, 40) + "..." : msg) : "N/A"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Show More",
      cell: ({ row }: { row: { original: ContactUs } }) => (
        <ContactUsModal
          contact={row.original}
          trigger={
            <button className="h-8 w-8 p-0 text-gray-600 hover:text-primary">
              <span className="sr-only">Show details</span>
              <EyeIcon />
            </button>
          }
          onSuccess={() => {
            refetch();
            mainRefetch();
          }}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  return (
    <div className="space-y-2 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4 mb-6">Manage Queries</h2>
      <ContactUsFilter
        filters={currentFilters}
        setFilters={setCurrentFilters}
        onFilterChange={handleFilterChange}
        isChanged={isFilterChanged}
      />
      <DataList
        data={data.contactForms}
        columns={showColumns}
        pagination={pagination}
        searchKey="name"
        searchText={currentFilters.search}
        onSearchChange={handleSearchChange}
        placeholder="Search query by name or email..."
        onReportAll={fetchAllContactUsData}
      />
    </div>
  );
};

export default ContactUsList;
