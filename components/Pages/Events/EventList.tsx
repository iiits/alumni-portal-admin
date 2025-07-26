import { axiosInstance } from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Event, EventFilters } from "./interface";

import DataList from "@/components/Commons/DataList";
import NoData from "@/components/Commons/NoData";
import Searching from "@/components/Commons/Searching";
import { Button } from "@/components/ui/button";
import { EyeIcon, PlusIcon } from "lucide-react";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";
import EventsFilter from "./EventListFilter";

interface ListProps {
  mainRefetch: () => void;
}

const EventList: React.FC<ListProps> = ({ mainRefetch }) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [appliedFilters, setAppliedFilters] = useState<EventFilters>({
    page: "1",
    limit: "10",
    search: "",
    startMonthYear: "",
    endMonthYear: "",
    type: "",
  });

  const [currentFilters, setCurrentFilters] = useState<EventFilters>({
    page: "1",
    limit: "10",
    search: "",
    startMonthYear: "",
    endMonthYear: "",
    type: "",
  });

  interface EventListProps {
    events: Event[];
    pagination: {
      currentPage: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
  }

  const { data, error, isLoading, refetch } = useQuery<EventListProps>({
    queryKey: ["eventList", appliedFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (appliedFilters.page) params.append("page", appliedFilters.page);
      if (appliedFilters.limit) params.append("limit", appliedFilters.limit);
      if (appliedFilters.search) params.append("search", appliedFilters.search);
      if (appliedFilters.startMonthYear)
        params.append("startMonthYear", appliedFilters.startMonthYear);
      if (appliedFilters.endMonthYear)
        params.append("endMonthYear", appliedFilters.endMonthYear);
      if (appliedFilters.type) params.append("type", appliedFilters.type);

      const response = await axiosInstance.get("/events", { params });
      return response.data?.data;
    },
  });

  const fetchAllEventData = async () => {
    const params = new URLSearchParams();
    params.append("page", "1");
    params.append("limit", data?.pagination.total.toString() || "1000");
    const response = await axiosInstance.get("/events", { params });
    return response.data?.data.events;
  };

  if (isLoading)
    return (
      <Searching
        message="Loading Event List..."
        description="Please wait while we fetch the latest event list data."
      />
    );
  if (error)
    return (
      <NoData
        message="Error loading Event List"
        description={error.message}
        url="/events"
      />
    );
  if (!data)
    return (
      <NoData
        message="No Event List Found"
        description="Please check back later."
        url="/events"
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
      accessorKey: "venue",
      header: "Venue",
    },
    {
      accessorKey: "dateTime",
      header: "Start Date & Time",
      cell: ({ row }: { row: { original: Event } }) => {
        const date = new Date(row.original.dateTime);
        return (
          <span>
            {date.toLocaleDateString()} - {date.toLocaleTimeString()}
          </span>
        );
      },
    },
    {
      accessorKey: "endDateTime",
      header: "End Date & Time",
      cell: ({ row }: { row: { original: Event } }) => {
        const endDate = row.original.endDateTime
          ? new Date(row.original.endDateTime)
          : null;
        return (
          <span>
            {endDate
              ? `${endDate.toLocaleDateString()} - ${endDate.toLocaleTimeString()}`
              : "N/A"}
          </span>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      id: "actions",
      header: "Show More",
      cell: ({ row }: { row: { original: any } }) => (
        <EditEventModal
          event={row.original}
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
      <h2 className="text-3xl font-semibold mt-4 ml-4 mb-6">Manage Events</h2>
      <div className="flex flex-wrap gap-2 justify-between items-center px-2">
        <EventsFilter
          filters={currentFilters}
          setFilters={setCurrentFilters}
          onFilterChange={handleFilterChange}
          isChanged={isFilterChanged}
        />
        <CreateEventModal
          onSuccess={() => {
            refetch();
            mainRefetch();
          }}
          trigger={
            <Button variant="default" className="flex gap-2 items-center">
              <PlusIcon className="w-4 h-4" />
              <span>Create new event</span>
            </Button>
          }
        />
      </div>
      <DataList
        data={data.events}
        columns={showColumns}
        pagination={pagination}
        searchKey="name"
        searchText={currentFilters.search}
        onSearchChange={handleSearchChange}
        placeholder="Search event by name or venue..."
        onReportAll={fetchAllEventData}
      />
    </div>
  );
};

export default EventList;
