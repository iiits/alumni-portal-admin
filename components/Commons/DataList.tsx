"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { ChevronDown } from "lucide-react";
import * as React from "react";

export type DataListProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
  };
  searchKey?: keyof T;
  searchText?: string;
  onSearchChange?: (text: string) => void;
  placeholder?: string;
};

const DataList = <T,>({
  data,
  columns,
  pagination,
  searchKey,
  searchText,
  onSearchChange,
  placeholder,
}: DataListProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    manualPagination: !!pagination,
    pageCount: pagination?.totalPages,
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {searchKey && (
          <Input
            placeholder={placeholder || `Filter by ${String(searchKey)}...`}
            value={searchText ?? ""}
            onChange={(event) => {
              if (onSearchChange) onSearchChange(event.target.value);
            }}
            className="max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Rows per page:</span>
          <input
            type="number"
            min={1}
            max={100}
            value={pagination?.perPage || 1}
            onChange={(e) => {
              const val = Math.max(1, Math.min(Number(e.target.value), 100));
              if (pagination?.onPerPageChange) pagination.onPerPageChange(val);
            }}
            className="border rounded px-2 py-1 w-16 text-center text-sm"
            placeholder="Per page"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (pagination?.onPageChange)
                pagination.onPageChange(
                  Math.max(1, (pagination.currentPage ?? 1) - 1),
                );
            }}
            disabled={pagination ? pagination.currentPage === 1 : false}
          >
            Previous
          </Button>
          <input
            type="number"
            min={1}
            max={pagination?.totalPages || 1}
            value={pagination?.currentPage || 1}
            onChange={(e) => {
              const val = Math.max(
                1,
                Math.min(Number(e.target.value), pagination?.totalPages || 1),
              );
              if (pagination?.onPageChange) pagination.onPageChange(val);
            }}
            className="border rounded px-2 py-1 w-16 text-center text-sm"
          />
          <span className="text-xs">/ {pagination?.totalPages || 1}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (pagination?.onPageChange)
                pagination.onPageChange(
                  Math.min(
                    pagination.totalPages,
                    (pagination.currentPage ?? 1) + 1,
                  ),
                );
            }}
            disabled={
              pagination
                ? pagination.currentPage === pagination.totalPages
                : false
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataList;
