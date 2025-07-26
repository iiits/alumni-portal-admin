"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export type DataTableProps<T> = {
  data: T[];
  heading?: string;
  seeMoreUrl?: string;
  footer?: React.ReactNode;
};

function toWordCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function DataTable<T extends Record<string, any>>({
  data,
  heading,
  seeMoreUrl,
  footer,
}: DataTableProps<T>) {
  const columns = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow p-4 h-full flex flex-col justify-around md:justify-between gap-6 max-h-fit">
      {heading && (
        <h2 className="text-xl lg:text-2xl text-center font-semibold">
          {heading}
        </h2>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col}>{toWordCase(col)}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={col}>{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {footer && <TableFooter>{footer}</TableFooter>}
      </Table>
      {seeMoreUrl && (
        <div className="flex justify-center">
          <Link
            href={seeMoreUrl}
            className="text-blue-500 font-semibold flex items-center gap-1"
          >
            See Complete List <ExternalLink />
          </Link>
        </div>
      )}
    </div>
  );
}

export default DataTable;
