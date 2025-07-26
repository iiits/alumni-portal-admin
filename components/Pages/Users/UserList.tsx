import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { UserFilters, UserProfileData } from "./interface";

import DataList from "@/components/Commons/DataList";
import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import UsersFilter from "./UserListFilter";

const UserList: React.FC = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [appliedFilters, setAppliedFilters] = useState<UserFilters>({
    page: "1",
    limit: "10",
    search: "",
    batch: "",
    department: "",
    role: "",
    verified: "",
  });

  const [currentFilters, setCurrentFilters] = useState<UserFilters>({
    page: "1",
    limit: "10",
    search: "",
    batch: "",
    department: "",
    role: "",
    verified: "",
  });

  interface UserListProps {
    users: UserProfileData[];
    pagination: {
      currentPage: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
  }

  const { data, error, isLoading, refetch } = useQuery<UserListProps>({
    queryKey: ["userList", appliedFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (appliedFilters.page) params.append("page", appliedFilters.page);
      if (appliedFilters.limit) params.append("limit", appliedFilters.limit);
      if (appliedFilters.search) params.append("search", appliedFilters.search);
      if (appliedFilters.batch) params.append("batch", appliedFilters.batch);
      if (appliedFilters.department)
        params.append("department", appliedFilters.department);
      if (appliedFilters.role) params.append("role", appliedFilters.role);
      if (appliedFilters.verified)
        params.append("verified", appliedFilters.verified);

      const response = await axiosInstance.get("/users", { params });
      return response.data?.data;
    },
  });

  const fetchAllUserData = async () => {
    const params = new URLSearchParams();
    params.append("page", "1");
    params.append("limit", data?.pagination.total.toString() || "1000");
    const response = await axiosInstance.get("/users", { params });
    return response.data?.data.users;
  };

  if (isLoading)
    return (
      <Searching
        message="Loading User List..."
        description="Please wait while we fetch the latest user list data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading User List"
        description={error.message}
        url="/users"
      />
    );
  if (!data)
    return (
      <NoData
        message="No User List Found"
        description="Please check back later."
        url="/users"
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

  return (
    <div className="space-y-8 shadow-md p-2">
      <h2 className="text-3xl font-semibold mt-4 ml-4">Manage Users</h2>
      <UsersFilter
        filters={currentFilters}
        setFilters={setCurrentFilters}
        onFilterChange={handleFilterChange}
        isChanged={isFilterChanged}
      />
      <DataList
        data={data.users}
        columns={showColumns}
        pagination={pagination}
        searchKey="name"
        searchText={currentFilters.search}
        onSearchChange={handleSearchChange}
        placeholder="Search user by name or email..."
        onReportAll={fetchAllUserData}
      />
    </div>
  );
};

const showColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "collegeEmail",
    header: "College Email",
  },
  {
    accessorKey: "personalEmail",
    header: "Personal Email",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "batch",
    header: "Batch",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "verified",
    header: "Verified",
  },
  {
    id: "actions",
    header: "Show More",
    cell: ({ row }: { row: { original: any } }) => (
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={() => console.log(row.original)}
      >
        <span className="sr-only">Show details</span>
        <EyeIcon />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default UserList;
