import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Referral, ReferralFilters } from "./interface";

import DataList from "@/components/Commons/DataList";
import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { Button } from "@/components/ui/button";
import { EyeIcon, PlusIcon } from "lucide-react";
import CreateJobModal from "./CreateJobModal";
import EditJobModal from "./EditJobModal";
import ReferralsFilter from "./ReferralListFilter";

interface ListProps {
  mainRefetch: () => void;
}

const ReferralList: React.FC<ListProps> = ({ mainRefetch }) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [appliedFilters, setAppliedFilters] = useState<ReferralFilters>({
    page: "1",
    limit: "10",
    search: "",
    startMonthYear: "",
    endMonthYear: "",
    dateField: "",
    minReferrals: "",
    maxReferrals: "",
  });

  const [currentFilters, setCurrentFilters] = useState<ReferralFilters>({
    page: "1",
    limit: "10",
    search: "",
    startMonthYear: "",
    endMonthYear: "",
    dateField: "",
    minReferrals: "",
    maxReferrals: "",
  });

  interface DataListProps {
    referrals: Referral[];
    pagination: {
      currentPage: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
  }

  const { data, error, isLoading, refetch } = useQuery<DataListProps>({
    queryKey: ["referralList", appliedFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (appliedFilters.page) params.append("page", appliedFilters.page);
      if (appliedFilters.limit) params.append("limit", appliedFilters.limit);
      if (appliedFilters.search) params.append("search", appliedFilters.search);
      if (appliedFilters.startMonthYear)
        params.append("startMonthYear", appliedFilters.startMonthYear);
      if (appliedFilters.endMonthYear)
        params.append("endMonthYear", appliedFilters.endMonthYear);
      if (appliedFilters.dateField)
        params.append("dateField", appliedFilters.dateField);
      if (appliedFilters.minReferrals)
        params.append("minReferrals", appliedFilters.minReferrals);
      if (appliedFilters.maxReferrals)
        params.append("maxReferrals", appliedFilters.maxReferrals);

      const response = await axiosInstance.get("/referrals", { params });
      return response.data?.data;
    },
  });

  const fetchAllReferralData = async () => {
    const params = new URLSearchParams();
    params.append("page", "1");
    params.append("limit", data?.pagination.total.toString() || "1000");
    const response = await axiosInstance.get("/referrals", { params });
    return response.data?.data.referrals;
  };

  if (isLoading)
    return (
      <Searching
        message="Loading Referral List..."
        description="Please wait while we fetch the latest referral list data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading Referral List"
        description={error.message}
        url="/referrals"
      />
    );
  if (!data)
    return (
      <NoData
        message="No Referral List Found"
        description="Please check back later."
        url="/referrals"
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
      accessorKey: "title",
      header: "Title",
      cell: ({ row }: { row: { original: Referral } }) => (
        <span>{row.original.jobDetails?.title || "-"}</span>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }: { row: { original: Referral } }) => (
        <span>{row.original.jobDetails?.company || "-"}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }: { row: { original: Referral } }) => (
        <span>{row.original.jobDetails?.role || "-"}</span>
      ),
    },
    {
      accessorKey: "numberOfReferrals",
      header: "No. of Referrals",
      cell: ({ row }: { row: { original: Referral } }) => (
        <span>{row.original.numberOfReferrals}</span>
      ),
    },
    {
      accessorKey: "postedByName",
      header: "Posted By",
      cell: ({ row }: { row: { original: Referral } }) => (
        <span>{row.original.postedBy?.name || "-"}</span>
      ),
    },
    {
      accessorKey: "postedOn",
      header: "Posted On",
      cell: ({ row }: { row: { original: Referral } }) => {
        const date = row.original.postedOn
          ? new Date(row.original.postedOn)
          : null;
        return <span>{date ? date.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      accessorKey: "lastApplyDate",
      header: "Last Apply",
      cell: ({ row }: { row: { original: Referral } }) => {
        const date = row.original.lastApplyDate
          ? new Date(row.original.lastApplyDate)
          : null;
        return <span>{date ? date.toLocaleDateString() : "-"}</span>;
      },
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }: { row: { original: Referral } }) => (
        <span>{row.original.isActive ? "Yes" : "No"}</span>
      ),
    },
    {
      id: "actions",
      header: "Show More",
      cell: ({ row }: { row: { original: any } }) => (
        <EditJobModal
          job={row.original}
          trigger={
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Show details</span>
              <EyeIcon />
            </Button>
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
      <h2 className="text-3xl font-semibold mt-4 ml-4 mb-6">
        Manage Referrals
      </h2>
      <div className="flex flex-wrap gap-2 justify-between items-center px-2">
        <ReferralsFilter
          filters={currentFilters}
          setFilters={setCurrentFilters}
          onFilterChange={handleFilterChange}
          isChanged={isFilterChanged}
        />
        <CreateJobModal
          onSuccess={() => {
            refetch();
            mainRefetch();
          }}
          trigger={
            <Button variant="default" className="flex gap-2 items-center">
              <PlusIcon className="w-4 h-4" />
              <span>Create new referral</span>
            </Button>
          }
        />
      </div>
      <DataList
        data={data.referrals}
        columns={showColumns}
        pagination={pagination}
        searchKey="numberOfReferrals"
        searchText={currentFilters.search}
        onSearchChange={handleSearchChange}
        placeholder="Search referral by company, role or poster's name..."
        onReportAll={fetchAllReferralData}
      />
    </div>
  );
};

export default ReferralList;
